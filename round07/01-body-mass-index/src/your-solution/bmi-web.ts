
import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    try {
      const bmi = calculateBmi(height, weight);
      res.send({weight, height, bmi});
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(500).send({ error: String(e.message) });
    }
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
