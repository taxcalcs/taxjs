import replaceInFiles from 'replace-in-files';
import fse from 'fs-extra';

const cpSource = "build/ts/";
const cpTarget = "build/ts-native/"
const tsFile = "build/ts-native/*.ts";

fse.copySync(cpSource, cpTarget, { overwrite: true });
console.log("Copy " + cpSource + " -> " + cpTarget);

try {
    const {
        changedFiles,
        countOfMatchesByPaths,
        replaceInFilesOptions
    } = replaceInFiles({
        files: tsFile,
        from: /.*import.*;.*/g,
        to: ' ',
    }).pipe({ from: /.*export class/, to: 'class' })
    //.pipe({ from: /(Lohnsteuer[a-zA-Z0-9]+Big)/g, to: "$1Js"});

    console.log('Count of matches by paths: ', countOfMatchesByPaths);
    console.log('Modified files: ', changedFiles);
} catch (error) {
    console.error('Error occurred: ', error);
};
