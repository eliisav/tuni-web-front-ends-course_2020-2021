
/*******************************
           DO NOT TOUCH         
 *******************************/

const { exec } = require('child_process');

const appName = '07-01 BODY MASS INDEX';

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

const appToStart = `${appDir}/bmi-${version}`;
const appPara1 = process.argv[3] === undefined ? '' : process.argv[3];
const appPara2 = process.argv[4] === undefined ? '' : process.argv[4];

const commandToRun = `${tsNode} ${appToStart} ${appPara1} ${appPara2}`;

console.log(`\n${appName} ( ${version} ) : ${AWF_SOLUTION} ( ${commitSHA} )\n`);

exec(commandToRun, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  } else {
    console.log(stdout);
  }
});

