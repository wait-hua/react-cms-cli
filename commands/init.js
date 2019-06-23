
const { prompt } = require('inquirer')
const program = require('commander')
const generator = require('./lib/generator');

const option = program.parse(process.argv).args[0]
const defaultName = typeof option === 'string' ? option : 'react-cms'
const question = [
    {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: defaultName,
        filter(val) {
            return val.trim()
        },
        validate(val) {
            const validate = (val.trim().split(" ")).length === 1
            return validate || 'Project name is not allowed to have spaces ';
        },
        transformer(val) {
            return val;
        }
    }, {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: 'React project',
        validate(val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    }
];

module.exports = prompt(question).then(({ name, description, author }) => {
    const projectName = `${name}`;

    const template = 'cms-template';
    
    generator({ name, description, author}, template, `./${projectName}`);
});