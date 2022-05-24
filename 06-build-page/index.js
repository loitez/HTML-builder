const fs = require('fs');
const path = require('node:path');

// create folder
fs.readdir(path.join('06-build-page', '/project-dist'), (err) => {
    if (err) {
        fs.mkdir(path.join('06-build-page', '/project-dist'), (err) => {
            console.log(err);
        });
    }
    fs.copyFile(path.join('06-build-page', '/template.html'), path.join('06-build-page', '/project-dist', '/template.html'), (err) => {
        if (err) {
            console.log(err);
        } else {
            fs.rename(path.join('06-build-page', '/project-dist', '/template.html'), path.join('06-build-page', '/project-dist', '/index.html'), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    fs.readFile(path.join('06-build-page', '/project-dist', '/index.html'), 'utf-8', (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        fs.readFile(path.join('06-build-page', '/components', '/articles.html'), 'utf-8', (err, contentArt) => {
                            if (err) {
                                console.log(err);
                            } else {
                                data = data.replace('{{articles}}', contentArt);
                                fs.writeFile(path.join('06-build-page', '/project-dist', '/index.html'), data, err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                                fs.readFile(path.join('06-build-page', '/components', '/footer.html'), 'utf-8', (err, contentFooter) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        data = data.replace('{{footer}}', contentFooter);
                                        fs.writeFile(path.join('06-build-page', '/project-dist', '/index.html'), data, err => {
                                            if (err) {
                                                console.log(err);
                                            }
                                        });
                                        fs.readFile(path.join('06-build-page', '/components', '/header.html'), 'utf-8', (err, contentHeader) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                data = data.replace('{{header}}', contentHeader);
                                                fs.writeFile(path.join('06-build-page', '/project-dist', '/index.html'), data, err => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });


                    });
                }
            });

        }

    });
});

// replace tags








g
// create folder assets

fs.readdir(path.join('06-build-page', '/project-dist', '/assets'), (err) => {
    if (err) {
        fs.mkdir(path.join('06-build-page', '/project-dist', '/assets'), (err) => {
            console.log(err);
        });
    }
});

// copy assets

fs.readdir(path.join('06-build-page', '/assets'), {withFileTypes: true}, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach((file) => {
            if (file.isDirectory()) {
                fs.readdir(path.join('06-build-page', '/project-dist', '/assets', `${file.name}`), (err) => {
                    if (err) {
                        fs.mkdir(path.join('06-build-page', '/project-dist', '/assets', `${file.name}`), (err) => {
                            console.log(err);
                        });
                    }
                });
                fs.readdir(path.join('06-build-page', '/assets', `${file.name}`), (err, oldFiles) => {
                    if (err) {
                        console.log(err);
                    } else {
                        oldFiles.forEach((oldFile) => {
                            fs.copyFile(path.join('06-build-page', '/assets', `${file.name}`, `${oldFile}`), path.join('06-build-page', '/project-dist', '/assets', `${file.name}`, `${oldFile}`), err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        });
                    }
                });
            } else if (!file.isDirectory()) {
                fs.copyFile(path.join('06-build-page', '/assets', `${file}`), path.join('06-build-page', '/project-dist', '/assets', `${file}`), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            /*fs.copy(path.join('06-build-page', '/assets', `${file}`), path.join('06-build-page', '/project-dist', '/assets'))*/
        });
    }
});


// css
const chunks  = [];
fs.readdir(path.join('06-build-page', '/styles'), {withFileTypes: true}, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach((file) => {
            if (!file.isDirectory() && path.extname(file.name) === '.css') {
                let readable = fs.createReadStream(
                    path.join('06-build-page', '/styles', `${file.name}`)
                );
                readable.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = readable.read())) {
                        chunks.push(chunk);
                    }
                });
                readable.on('end', () => {
                    const content = chunks.join('');
                    let writeableStream = fs.createWriteStream(path.join('06-build-page', '/project-dist', 'style.css'));
                    writeableStream.write(content);
                });
            }
        });
    }
});
