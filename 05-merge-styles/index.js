const path = require('path');
const fs = require('fs');

const from = path.resolve(__dirname, 'styles');

readFiles(from);

function readFiles(from) {
    const target = path.join(__dirname, 'project-dist', 'bundle.css');

    fs.writeFile(target, '', (err) => {
        if (err) {
            return err;
        }
    });

    fs.readdir(from, {withFileTypes: true}, (err, files) => {
        if (err) {
            return err;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const isCssFile = file.name.match(/\.css$/) && !file.isDirectory();

            if (isCssFile) {
                const stream = fs.createReadStream(path.join(from, file.name));

                stream.on('data', (data) => {
                    fs.appendFile(target, data.toString(), (err) => {
                        if (err) {
                            return err;
                        }
                    })
                })
            }
        }
    });
}
