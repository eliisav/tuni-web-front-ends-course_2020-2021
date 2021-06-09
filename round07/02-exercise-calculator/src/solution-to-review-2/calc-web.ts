
import express from 'express';
import { calculateExercises } from './exercise-calculator';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/about', (_req, res) => {
    res.send("Welcome to exercise hours calculator. Enter values in request.")
  });

app.post('/calc', (req, res) => {
    const days = req.body.daily_exercises;
    const target = req.body.target;
    let invalidValues = days.filter((value: number) => isNaN(value) === true)
  
    if(invalidValues.length > 0){
      res.status(400);
      res.send({error: "malformatted parameters"})
    }
    else if(days === undefined || target === undefined){
      res.status(400);
      res.send({error: "parameters missing"})
    }
    else{
      const result = calculateExercises(days, target);
      res.send(result);
    }

});



const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
