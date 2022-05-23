const fs = require('fs');
const path = require('node:path');

const directoryName = path.join('03-files-in-folder', '/secret-folder');

fs.readdir(directoryName,  {withFileTypes: true}, (err, files) => {
    if (err)
        console.log(err);
    else {
        console.log('\nCurrent directory filenames:');
        files.forEach(file => {
            if (!file.isDirectory()) {
                fs.stat(path.join('03-files-in-folder', '/secret-folder', `${file.name}`), function(err, stats){
                    let size = stats.size;
                    let name = file.name.split('.')[0];
                    let extension = path.extname(file.name).substring(1);
                    console.log(`${name} - ${extension} - ${size}b`);
                });
            }
        });
    }
});
