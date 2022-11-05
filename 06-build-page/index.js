const path = require('path');
const fs = require('fs/promises');
const copyDir = require('../04-copy-directory/index');
const mergeStyles = require('../05-merge-styles/index');

createAPP();

function createAPP() {
    createDist().then((distPath) => {
        createIndexHTML(distPath).then(() => {
            const from = path.resolve(__dirname, 'assets');
            const to = path.resolve(__dirname, 'project-dist', 'assets');

            copyDir(from, to).then(() => {
                const from = path.resolve(__dirname, 'styles');
                const to = path.resolve(__dirname, 'project-dist', 'style.css');

                mergeStyles(from, to);
            });
        })
    })
}

async function createDist() {
    const distPath = path.resolve(__dirname, 'project-dist');

    await fs.mkdir(distPath, {recursive: true});

    return distPath;
}

async function createIndexHTML(distPath) {
    const indexPath = path.join(distPath, 'index.html');

    await fs.writeFile(indexPath, '');

    const template = await getTemplate();

    let result = {
        template: '',
    };

    for (let i = 0; i < template.length; i++) {
        const chunk = template[i];

        if (chunk.includes('}}')) {
            await replaceComponent(result, chunk);
        } else {
            result.template += chunk;
        }
    }

    await fs.appendFile(indexPath, result.template);
}

async function replaceComponent(result, chunk) {
    const arr = chunk.split('}}');

    const name = arr.at(0);
    const end = arr.slice(1);

    const component = path.resolve(__dirname, 'components', name + '.html');

    const componentContent = await fs.readFile(component);

    result.template += componentContent.toString();
    result.template += end;
}

async function getTemplate() {
    const templatePath = path.resolve(__dirname, 'template.html');

    const template = await fs.readFile(templatePath, {encoding: 'utf-8'});

    const arr = template.split('{{');

    return arr;
}
