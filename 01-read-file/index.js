const fs = require('fs');
const path = require('path');

const stream = new fs.ReadStream(path.resolve(__dirname, 'text.txt'));

stream.pipe(process.stdout);
