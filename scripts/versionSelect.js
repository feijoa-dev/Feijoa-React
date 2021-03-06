'use strict';
const { exec } = require('child_process');
const { promisify } = require('util')
const inquirer = require('inquirer');

const asyncExec = promisify(exec);

const question = {
  type: 'list',
  name: 'version',
  message: 'Semantic Version?',
  choices: ['Patch', 'Minor', 'Major'],
  filter(val) {
    return val.toLowerCase();
  },
};

(async () => {
  // const { version } = await inquirer.prompt(question);
  // await asyncExec(`npm version ${version} --no-git-tag-version`);
  return process.nextTick(async () => {
    const { version } = await inquirer.prompt(question);
    await asyncExec(`npm version ${version} --no-git-tag-version`);
  })
})();