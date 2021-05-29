
import express from 'express';
const cors = require('cors')

const appName = '07-05 PATIENTOR';

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

(async () => {

  const { AWF_SOLUTION } = process.env;

  let module;

  switch (AWF_SOLUTION) {
    case 'your-solution':
    case 'solution-to-review-1':
    case 'solution-to-review-2':
      module = await import(`./${AWF_SOLUTION}/app`);
      break;
    default: {
      // module = await import('./_stage0/app');
      // module = await import('./_stage1/app');
      // module = await import('./_stage4/app');
      // module = await import('./_stage8/app');
    }

  }

  const { diagnoseRouter, patientRouter, commitSHA } = module;

  app.use('/api/diagnoses', diagnoseRouter);
  app.use('/api/patients', patientRouter);

  console.log(`\n${appName} : ${AWF_SOLUTION || 'example' } ( ${commitSHA} )\n`);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


})();

