const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const pathFile = path.resolve(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(pathFile, 'utf-8');

writeStream.on('open', () => {
    console.log('Hello, please type a text in file:');
});

rl.on('close', () => {
    writeStream.close();
});

writeStream.on('close', () => {
    console.log('\nBYE!!!');
    rl.close();
});

rl.on('line', (data) => {
    if (data.toLowerCase() === 'exit') {
        writeStream.close();
    } else {
        writeStream.write(data + '\n');
    }
});
