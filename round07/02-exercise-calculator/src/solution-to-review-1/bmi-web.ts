
import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    if (!height || !weight) {
        res.send({
            error: "malformatted parameters"
        })
    } else {
        const str = calculateBmi(height, weight)
        const result = {
            height,
            weight,
            bmi: str
        }
        res.send(result);
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
