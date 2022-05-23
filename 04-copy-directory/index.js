const fs = require('fs');
const path = require('node:path');

fs.readdir(path.join('04-copy-directory', '/files-copy'), (err) => {
    if (err) {
        fs.mkdir(path.join('04-copy-directory', '/files-copy'), (err) => {
            console.log(err);
        });
    }
    fs.readdir(path.join('04-copy-directory', '/files'), (err, oldFiles) => {
        if (err) {
            console.log(err);
        } else {
            oldFiles.forEach(oldFile => {
                fs.copyFile(path.join('04-copy-directory', '/files', `${oldFile}`), path.join('04-copy-directory', '/files-copy', `${oldFile}`), err => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        }
    });
});


