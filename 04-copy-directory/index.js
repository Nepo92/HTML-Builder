


const path = require('path');
const fs = require('fs/promises');
const { rm } = require('fs');

const from = path.resolve(__dirname, 'files');
const to = path.resolve(__dirname, 'files-copy');

copyDir(from, to);

async function copyDir(from, to) {
    try {
        await fs.rm(to, {recursive: true});
        await makeCopy(from, to);
    } catch (e) {
        await makeCopy(from, to);
    }
}

async function makeCopy(from, to) {
    await fs.mkdir(to);
    
    const files = await fs.readdir(from, {withFileTypes: true});
    
    if (files.length) {
        await copyFiles(files, from, to);
    }
}

async function copyFiles(files, from, to) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isDirectory = file.isDirectory();

        const fromPath = path.join(from, file.name);
        const toPath = path.join(to, file.name);

        if (!isDirectory) {
            await fs.copyFile(fromPath, toPath);
        } else {
            await copyDir(fromPath, toPath)
        }
    }
}
