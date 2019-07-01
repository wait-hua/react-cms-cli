const Metalsmith = require('metalsmith');
const ejs = require('ejs');
const rm = require('rimraf').sync;
const downloadGitRepo = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');

const GIT_REPO = 'github:wait-hua/react-cms-cli';

function download(distPath) {
    return new Promise((resolve, reject) => {
        downloadGitRepo(GIT_REPO, `${distPath}_temp`, (err) => {
            if (err) {
                console.log(chalk.red(err));
                process.exit();
                reject();
            }
            resolve();
        })
    })
}

function tranform(metadata = {}, templatePath, destPath) {
    // const src = `${destPath}_temp`;
    const src = templatePath;

    if (!src) {
        return Promise.reject(new Error(`无效的src地址: ${src}`));
    }
    console.log(chalk.green(`begin download:' ${src}`));

    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .source(templatePath)
            .destination(destPath)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata();
                Object.keys(files).forEach(fileName => {
                    if (!fileName.includes('node_modules')) {
                        const t = files[fileName].contents.toString();
                        if (!/^.*\.(jpg|png|svg)$/.test(fileName)) {
                            files[fileName].contents = new Buffer(ejs.render(t, metadata));
                        }
                    }
                })
                done()
            })
            .build(err => {
                // rm(src);
                err ? reject(err) : resolve();
            })
    });
}

module.exports = function (metadata = {}, template, destPath) {
    const spinner = ora('Downloading please wait...');
    spinner.start();

    const tplPath = path.resolve(__dirname, '../../template/');
    const absolutePath = path.resolve(destPath);

    // download(destPath).then(() => {
    return tranform(metadata, `${tplPath}/${template}`, destPath)
            .then(() => {
                spinner.stop();
                console.log(chalk.green('project init successfully!'));
                console.log(chalk.green(`project path: ${absolutePath}`))
            })
            .catch((err) => {
                spinner.stop();
                console.log(chalk.red(err));
                process.exit();
            });
    // });
}