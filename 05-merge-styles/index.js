const fs = require('fs');
const path = require('node:path');

const chunks = [];

fs.readdir(path.join('05-merge-styles', '/styles'), {withFileTypes: true}, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach((file) => {
            if (!file.isDirectory() && path.extname(file.name) === '.css') {
                let readable = fs.createReadStream(
                    path.join('05-merge-styles', '/styles', `${file.name}`)
                );
                readable.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = readable.read())) {
                        chunks.push(chunk);
                    }
                });
                readable.on('end', () => {
                    const content = chunks.join('');
                    let writeableStream = fs.createWriteStream(path.join('05-merge-styles', '/project-dist', 'bundle.css'));
                    writeableStream.write(content);
                });
            }
        });
    }
});



