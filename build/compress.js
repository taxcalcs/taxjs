// uglifyjs  --compress --mangle --output build/umd/Lohnsteuer2006Big.min.js  --source-map "content='build/umd/Lohnsteuer2006Big.js.map'" build/umd/Lohnsteuer2006Big.js

const UglifyJS = require("uglify-js");
const fs = require('fs');

function run(folder, folderMap) {
    new Promise(function (resolve, reject) {
        var filenames = fs.readdirSync(folder);
        var found = [];
        filenames.forEach((file) => {
            if (file.endsWith("Big.js")) {
                found.push(file);
            }
        });
        resolve(found);
    }).then(founds => {
        console.log("start compressing " + folder);
        founds.forEach(function (fileName) {
            console.log("compress " + fileName);

            const className = String(fileName).replace('.js', '');
            const targetFile = folder + className + ".min.js";
            const targetMapFile = folderMap + className + ".min.js.map";

            var x = fs.readFileSync(folder + fileName, "utf8");
            var xMAP = fs.readFileSync(folder + fileName + '.map', "utf8");

            var options = {
                mangle: {},
                sourceMap: {
                    filename: '../../' + targetFile,
                    content: xMAP,
                    url: '../../' + targetMapFile
                }
            };

            var y = UglifyJS.minify({ targetFile: x }, options);
            fs.writeFileSync(targetFile, y.code);
            fs.writeFileSync(targetMapFile, y.map);
        });
    });
}

run("dist/umd/", "dist/umd/");
run("dist/es2015/", "dist/es2015/");
run("dist/system/", "dist/system/");
run("dist/js/", "dist/js/");
