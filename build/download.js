import fetch from "node-fetch";
import AdmZip from "adm-zip";
import path from "path";
import replaceInFiles from "replace-in-files";
import {testVersion, unpackFolder} from "./config.js";

// create json XSLT from xml XSLT:
// xslt3 -xsl:build/transform.xsl -export:build/transform.sef.json -t -ns:##html5

const download = 'https://repo1.maven.org/maven2/info/kuechler/bmf/taxapi/taxxmls/' + testVersion + '/taxxmls-' + testVersion + '.jar';
fetch(download).then(res => res.arrayBuffer())
    .then(arrayBuffer => Buffer.from(arrayBuffer))
    .then(buffer => {
        return new Promise(function (resolve, _reject) {
            const zip = new AdmZip(buffer);
            const zipEntries = zip.getEntries();
            const found = [];
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
        const found = [];
        const dirPath = path.join(path.resolve(path.dirname('.')), unpackFolder);
        xmlFileNames.forEach(function (xmlFileName) {
            //
            if (xmlFileName === 'Lohnsteuer2023JanuarBig.xml') {
                console.log("replace: " + xmlFileName);
                const options = {
                    files: dirPath + '/' + xmlFileName,
                    from: /Lohnsteuer2023Big/g,
                    to: 'Lohnsteuer2023JanuarBig',
                };
                found.push(replaceInFiles(options));
            } else {
                found.push(Promise.resolve(xmlFileName));
            }
        });
        Promise.all(found).then(_results => {
            resolve(xmlFileNames);
        });
    })
});
