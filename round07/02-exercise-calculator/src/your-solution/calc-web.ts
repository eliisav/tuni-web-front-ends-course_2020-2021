
import express from 'express';
import { calculateExercises } from './exercise-calculator';

const app = express();
app.use(express.json());

interface Arguments {
  daily_exercises: Array<number>
  target: number
}

const validateArray = (numArray: Array<number>): boolean => {
  if (Array.isArray(numArray)) {
    return numArray.every((value: number) =>
      !isNaN(Number(value))
    );
  }
  return false;
};

app.post('/calc', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const args: Arguments = req.body;

  if (args.daily_exercises === undefined || args.target === undefined) {
    return res.status(400).json({error: 'parameters missing'});
  }

  if (!validateArray(args.daily_exercises) || isNaN(Number(args.target))) {
    return res.status(400).json({error: 'malformatted arguments'});
  }

  const result = calculateExercises(args.daily_exercises, args.target);
  return res.json(result);
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Test cases
// {"daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],"target": 2.5}
// {"daily_exercises": [1, "x", 2, 0, 3, 0, 2.5],"target": 2.5}
// {"daily_exercises": [1, 0, 2, 0, 3, 0, 2.5]}
