import SaxonJS from 'saxon-js';
import * as path from 'path';
import * as fs from 'fs/promises';
import {tsFolder, unpackFolder} from "./config.js";

fs.readdir(unpackFolder).then(xmlFileNames => {
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
