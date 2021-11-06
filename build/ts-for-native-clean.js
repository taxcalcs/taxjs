import fse from 'fs-extra';

fse.remove("build/ts-native/", err => {
    if (err)
        console.log("ERROR remove build/ts-native/");
    else
        console.log("Remove build/ts-native/");
});
