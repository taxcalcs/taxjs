import SaxonJS from 'saxon-js';
import AdmZip from 'adm-zip';
import fetch from 'node-fetch';
import * as path from 'path';
import replaceInFiles from 'replace-in-files';

// create json XSLT from xml XSLT:
// xslt3 -xsl:build/transform.xsl -export:build/transform.sef.json -t -ns:##html5

const testVersion = '2023.1.0';
const download = 'https://repo1.maven.org/maven2/info/kuechler/bmf/taxapi/taxxmls/' + testVersion + '/taxxmls-' + testVersion + '.jar';
const unpackFolder = "build/unpacked";
const tsFolder = "build/ts";

fetch(download).then(res => res.arrayBuffer())
    .then(arrayBuffer => Buffer.from(arrayBuffer))
    .then(buffer => {
        return new Promise(function (resolve, _reject) {
            var zip = new AdmZip(buffer);
            var zipEntries = zip.getEntries();
            var found = [];
            zipEntries.forEach(function (zipEntry) {
                if (zipEntry.entryName.endsWith("Big.xml")) {
                    zip.extractEntryTo(zipEntry.entryName, unpackFolder, false, true);
                    found.push(zipEntry.entryName);
                }
            });
            resolve(found);
        })
    }).then(xmlFileNames => {
        return new Promise(function (resolve, _reject) {
            var found = [];
            const dirPath = path.join(path.resolve(path.dirname('.')), unpackFolder);
            xmlFileNames.forEach(function (xmlFileName) {
                // 
                if (xmlFileName == 'Lohnsteuer2023JanuarBig.xml') {
                    console.log("replace: " + xmlFileName);
                    const options = {
                        files: dirPath + '/' + xmlFileName,
                        from: /Lohnsteuer2023Big/g,
                        to: 'Lohnsteuer2023JanuarBig',
                    };
                    found.push(replaceInFiles(options));
                }else {
                    found.push(Promise.resolve(xmlFileName));
                }
            });
            Promise.all(found).then(_results => {
                resolve(xmlFileNames);
            });
        })
    }).then(xmlFileNames => {
        const dirPath = path.join(path.resolve(path.dirname('.')), tsFolder);
        console.log("outdir: " + dirPath);
        xmlFileNames.forEach(function (xmlFileName) {
            console.log("create " + xmlFileName);
            SaxonJS.transform({
                stylesheetFileName: "build/transform.sef.json",
                sourceFileName: unpackFolder + '/' + xmlFileName,
                destination: "file",
                baseOutputURI: "file://" + dirPath + '/' + String(xmlFileName).replace('.xml', '.ts')
            }, "sync");
        });
    });
