const fs = require('fs');
const path = require('node:path');
const process = require('node:process');
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let writeableStream = fs.createWriteStream(path.join('02-write-file', '/hello.txt'));
const chunks = [];
let answers;

readline.question('Write your greeting please\n', (answer) => {
    if (answer.trim() === 'exit') {
        readline.close();
        console.log('Bye-bye');
    } else {
        chunks.push(answer + '\n');
        readline.on('line', (answer) => {
            if (answer.trim() === 'exit') {
                answers = chunks.join('');
                writeableStream.write(answers);
                readline.close();
                return console.log('Bye-bye');
            }
            chunks.push(answer + '\n');
        });
    }
    readline.on('SIGINT', () => {
        answers = chunks.join('');
        writeableStream.write(answers);
        readline.close();
        console.log('Bye-bye');
    });
});






