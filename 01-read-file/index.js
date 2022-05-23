const fs = require('node:fs');
const path = require('node:path');
let readable = fs.createReadStream(
    path.join('01-read-file', '/text.txt')
);

const chunks = [];

readable.on('readable', () => {
    let chunk;
    while (null !== (chunk = readable.read())) {
        chunks.push(chunk);
    }
});

readable.on('end', () => {
    const content = chunks.join('');
    console.log(content);
});




