const path = require('path');
const fsPromises = require('fs/promises');

const pathDir = path.resolve(__dirname, 'secret-folder');

getStat();

async function getStat() {
    const files = await fsPromises.readdir(pathDir, {withFileTypes: true});

    await getFilesData(files);
}

async function getFilesData (files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const notDirectory = !file.isDirectory();

        if (notDirectory) {
            const ext = path.extname(file.name).slice(1);
            const basename = path.basename(file.name, '.' + ext);
            const stat = await fsPromises.stat(path.join(pathDir, file.name));
            const size = stat.size / 1000 + 'kb';

            console.log(`${basename} - ${ext} - ${size}`);
        }
    }
}
