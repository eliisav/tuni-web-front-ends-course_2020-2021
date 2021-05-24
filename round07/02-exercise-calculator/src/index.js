
/*******************************
           DO NOT TOUCH         
 *******************************/

const { exec } = require('child_process');

const appName = '07-02 EXERCISE CALCULATOR';

// 'your-solution' | 'solution-to-review-1' | 'solution-to-review-2'
const { AWF_SOLUTION } = process.env 

const appDir = `${__dirname}/${AWF_SOLUTION}`
const { commitSHA } = require(`${appDir}/app`);

const version = process.argv[2];

if (!['hc', 'cli', 'web'].includes(version)) {
  console.error('Usage: <app> { hc | cli <weight> <height> | web }');
  process.exit(1);
}

const tsNode = `${__dirname}/../node_modules/.bin/ts-node`;

const appToStart = `${appDir}/calc-${version}`;

let appParams = '';
for(let i = 3; !(process.argv[i] === undefined); i++) {
  appParams += ` ${process.argv[i]}`;
}

const commandToRun = `${tsNode} ${appToStart} ${appParams}`;

console.log(`\n${appName} ( ${version} ) : ${AWF_SOLUTION} ( ${commitSHA} )\n`);

exec(commandToRun, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stdout);
  }
});


