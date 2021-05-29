
import express from 'express';
import { calculateExercises } from './exercise-calculator';

const app = express();
app.use(express.json());


// ...



const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
