const { prompt } = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const generator = require('./lib/generator');
const fs = require('fs');

const cwd = process.cwd();

const questions = [{
    type: 'list',
    name: 'type',
    message: 'which page type do you want to generater?',
    choices: [
        'functionPage',
        'classPage',
    ]
}, {
    type: 'input',
    name: 'name',
    message: "what's the name of the page",
    validate(val) {
        const validate = val && (val.trim().split(" ")).length === 1
        return validate || 'Project name is not allowed to have spaces ';
    }
}, {
    type: 'confirm',
    name: 'useRedux',
    message: '页面是否使用redux',
    default: false,
}];

function getPath() {
    if (fs.existsSync(path.join(cwd, './package.json'))) {
        return 'root';
    }
    if (fs.existsSync(path.join(cwd, './components'))) {
        return 'src';
    }
    if (cwd.includes('src/pages')) {
        return 'pages'
    }
    return '';
}

prompt(questions).then((answers) => {
    const name = answers.name;
    const useRedux = answers.useRedux;

    const isClassPage = answers.type === 'classPage'; // 默认为 functionPage
    // 限定只能在 根路径下，或者在 src, 或者在 src/pages 下面了，否则其他地方创建直接报错
    const curPath = getPath();
    let pagePath = '';
    if (curPath === 'root') {
        pagePath = `./src/pages/${name}`;
    } else if (curPath === 'src') {
        pagePath = `./pages/${name}`;
    } else if (curPath === 'pages') {
        pagePath = `./${name}`;
    } else {
        console.log(chalk.red('只能在项目根目录/src目录/pages目录下创建页面'));
        process.exit();
    }

    generator({ name, useRedux, classPage: isClassPage }, 'page-template/page', pagePath)
        .then(() => {
            // 重命名文件
            fs.readdir(pagePath, (err, files) => {
                if (err) {
                    console.log(chalk.red(err));
                    return;
                }
                files.forEach(filename => {
                    const newName = filename.replace(/page/, name);
                    fs.rename(
                        path.join(pagePath, filename),
                        path.join(pagePath, newName),
                        (err) => {
                            if (err) {
                                console.log(chalk.red(err));
                                process.exit();
                            }
                        }
                    )
                });
            })
        });
    }
);