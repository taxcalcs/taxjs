import AdmZip from 'adm-zip';
import fetch from 'node-fetch';
import path from 'path';
import Big from 'big.js';
import fs from 'fs';
import csv from'csv-parser';
import assert from 'assert';

const testVersion = '2023.1.0';
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
                case 2022:
                    map.set('KVZ', new Big(1.3))
                    break;
                case 2023:
                    map.set('KVZ', new Big(1.6))
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
    }else if (type.endsWith('-mai')) {
        if (year === 2022) {
            name = 'Lohnsteuer2022MaiBig'
        }
    }else if (type.endsWith('-januar')) {
        if (year === 2023) {
            name = 'Lohnsteuer2023JanuarBig'
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
    return '../dist/es2015/' + parameterClass(year, type) + '.min.js';
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

fetch(download).then(res => res.arrayBuffer())
.then(arrayBuffer => Buffer.from(arrayBuffer))
.then(buffer => {
    return new Promise(function (resolve, _reject) {
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

        import(parameterModule(year, type)).then(TaxModule => {
            const TaxClazz = parameterClass(year, type);
            let counter = 0;

            fs.createReadStream(path.join(unpackFolder, String(year), file))
                .pipe(csv())
                .on('data', (row) => {
                    const income = function() {
                        const sep = type.lastIndexOf('-');
                        const additional = sep == -1 ? '' : type.substring(sep);
                        let incomeIndex;
                        if (additional === "-januar") {
                            // fix for wrong name
                            incomeIndex = type + '-' + year;
                        }else {
                            incomeIndex = type.replace(additional, '') + '-' + year + additional;
                        }
                        // console.log("incomeIndex=" + incomeIndex + " " + JSON.stringify(row));
                        const incomeEur = row[incomeIndex];
                        return new Big(incomeEur).mul(new Big(100));
                    }();
                    
                    ['I', 'II', 'III', 'IV', 'V', 'VI'].forEach(function(taxClass) {
                        const expected = new Big(row[taxClass]);
                        const taxClassNumeric = taxClassMapping[taxClass];
                        const l = new TaxModule[TaxClazz]();

                        l.initInputs(); // set all input variables to zero
                        l.set('LZZ', 1);
                        l.set('STKL', taxClassNumeric);
                        l.set('RE4', income);

                        const addMap = parameterFunc(year, taxClassNumeric, isSpecial);
                        addMap.forEach(function(value, parameter) {
                            l.set(parameter, value);
                        });

                        l.calculate();
                        const calculatedTax = l.get('LSTLZZ').div(new Big(100));
                        assert.strictEqual(expected.toNumber() , calculatedTax.toNumber(), "Year: " + year + " Type: " + type + " Income: " + income + " Tax class: " + taxClassNumeric + " Calculated Tax: " + calculatedTax + " Expected Tax: " + expected);
                        counter++;
                    });
                })
                .on('end', () => {
                    console.log('CSV file successfully processed with' + TaxClazz + '. Year: ' + year + ' Type: ' + type + ', tests run: ' + counter);
            });
        });
    });
});
