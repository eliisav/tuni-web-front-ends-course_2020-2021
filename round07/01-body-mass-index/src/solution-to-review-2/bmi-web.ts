
import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();

app.get('/bmi', (req, res) => {
  let obj;
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    obj = { height, weight, bmi };
  } else {
    obj = { error: "malformatted parameters" };
  }
  res.send(obj);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
