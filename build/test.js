const AdmZip = require('adm-zip');
const fetch = require('node-fetch');
const path = require('path');
const Big = require('big.js');
const fs = require('fs');
const csv = require('csv-parser');
const assert = require('assert').strict;

const testVersion = '2021.0.0';
const download = 'https://github.com/taxcalcs/taxcalculator/archive/' + testVersion + '.zip';
const unpackFolder = "build/unpacked-tests";
const pathPrefix = 'taxcalculator-' + testVersion + '/src/test/resources/info/kuechler/bmf/taxcalculator/';

/**
 * Get a Map with the test data.
 * 
 * @param {number} year the year to test (>= 2006)
 * @param {number} taxClass the tax class 1-6
 * @param {boolean} special is special (or general) test data used
 */
function parameterFunc(year, taxClass, special) {
    let map = new Map()
    if (special) {
        map.set('KRV', year < 2010 ? 1 : 2);
        if (year >= 2010) {
           map.set('PKV', 1);
           map.set('PKPV', new Big(0));
        }
    }else {
        map.set('KRV', 0);
        if (year >= 2010) {
            map.set('PKV', 0);
            map.set('PVZ', taxClass == 2 ? 0 : 1);

            switch (year) {
                case 2015:
                case 2019:
                    map.set('KVZ', new Big(0.9))
                    break;
                case 2018:
                    map.set('KVZ', new Big(1.0))
                    break;
                case 2016:
                case 2017:
                case 2020:
                    map.set('KVZ', new Big(1.1))
                    break;
                case 2021:
                    map.set('KVZ', new Big(1.3))
                    break;
            }
        }
    }
    return map;
}

/**
 * Get the class name for test.
 * 
 * @param {number} year the year to test (>= 2006)
 * @param {String} type the type to test (= test file name w/o file ending)
 */
function parameterClass(year, type) {
    var name = 'Lohnsteuer' + year + 'Big';
    if (type.endsWith('-nov')) {
        if (year === 2011) {
            name = 'Lohnsteuer2011NovemberBig';
        }else if (year === 2015) {
            name = 'Lohnsteuer2015Big';
        }
    }else if (type.endsWith('-dec')) {
        if (year === 2011) {
            name = 'Lohnsteuer2011DecemberBig'
        }else if (year === 2015) {
            name = 'Lohnsteuer2015DezemberBig';
        }
    }
    return name;
}

/**
 * Get the module path for test.
 * 
 * @param {number} year the year to test (>= 2006)
 * @param {String} type the type to test (= test file name w/o file ending)
 */
function parameterModule(year, type) {
    return '../dist/umd/' + parameterClass(year, type) + '.min';
}

/**
 * Mapping between the tax class and numeric class.
 */
const taxClassMapping = {
    'I' : 1,
    'II' : 2,
    'III' : 3,
    'IV' : 4,
    'V' : 5,
    'VI' : 6
};

fetch(download).then(res => res.buffer())
.then(buffer => {
    return new Promise(function (resolve, reject) {
        var zip = new AdmZip(buffer);
        var zipEntries = zip.getEntries();
        var found = [];
        zipEntries.forEach(function(zipEntry) {
            if (zipEntry.entryName.startsWith(pathPrefix) && zipEntry.entryName.endsWith('.csv') && ! zipEntry.isDirectory) {
                var name = zipEntry.entryName.replace(pathPrefix, '');
                var parts = name.split('/', 2); 
                const unpackFolderYear = path.join(unpackFolder, parts[0]);
                zip.extractEntryTo(zipEntry.entryName, unpackFolderYear, false, true);
                found.push(parts);
            }
        });
        resolve(found);
    })
}).then(testFiles => {
    testFiles.forEach(function(testFile) {
        const year = Number(testFile[0]);
        const type = testFile[1].replace('.csv', '');
        const file = testFile[1];
        const isSpecial = type.indexOf('general') == -1;
        const TaxModule = require(parameterModule(year, type));
        const TaxClazz = parameterClass(year, type);

        fs.createReadStream(path.join(unpackFolder, String(year), file))
            .pipe(csv())
            .on('data', (row) => {
                const income = function() {
                    const sep = type.lastIndexOf('-');
                    const additional = sep == -1 ? '' : type.substring(sep);
                    const incomeEur = row[type.replace(additional, '') + '-' + year + additional];
                    return new Big(incomeEur).mul(new Big(100));
                }();
                
                ['I', 'II', 'III', 'IV', 'V', 'VI'].forEach(function(taxClass) {
                    const expected = new Big(row[taxClass]);
                    const taxClassNumeric = taxClassMapping[taxClass];
                    const l = new TaxModule[TaxClazz]();

                    l.initInputs(); // set all input variables to zero
                    l.setNumber('LZZ', 1);
                    l.setNumber('STKL', taxClassNumeric);
                    l.setBig('RE4', income);

                    const addMap = parameterFunc(year, taxClassNumeric, isSpecial);
                    addMap.forEach(function(value, parameter) {
                        if (value instanceof Big) {
                            l.setBig(parameter, value);
                        }else {
                            l.setNumber(parameter, value);
                        }
                    });
                    
                    l.calculate();
                    const calculatedTax = l.get('LSTLZZ').div(new Big(100));
                    assert.strictEqual(expected.toNumber() , calculatedTax.toNumber(), "Year: " + year + " Type: " + type + " Income: " + income + " Tax class: " + taxClassNumeric + " Calculated Tax: " + calculatedTax + " Expected Tax: " + expected);
                });
            })
            .on('end', () => {
                console.log('CSV file successfully processed. Year: ' + year + ' Type: ' + type);
        });
    });
});
