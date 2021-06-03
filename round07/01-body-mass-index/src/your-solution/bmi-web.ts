
import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });

  } else {
    try {
      const bmi = calculateBmi(height, weight);
      res.send({weight, height, bmi});

    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown error';
      res.status(500).send({ error: msg });
    }

  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
