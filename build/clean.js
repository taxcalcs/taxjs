import fse from 'fs-extra';

const folders = ['build/unpacked-tests/', 'dist/'];

folders.forEach(function (folder) {
    fse.remove(folder, err => {
        if (err) {
            console.log('ERROR remove ' + folder);
        } else {
            console.log('Remove ' + folder);
        }
    });
});
