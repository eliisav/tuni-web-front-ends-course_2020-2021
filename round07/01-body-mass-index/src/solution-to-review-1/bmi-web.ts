
import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();


app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({error: "missing parameters"});
    return;
  }
  
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({error: "malformatted parameters"});
    return;
  }

  if (weight <= 0 || height <= 0) {
    res.status(400).send({error: "malformatted parameters"});
    return;
  }

  const bmi = calculateBmi(height, weight);
  const result = {
    weight,
    height,
    bmi
  };

  res.send(result);
});

app.listen(3002);