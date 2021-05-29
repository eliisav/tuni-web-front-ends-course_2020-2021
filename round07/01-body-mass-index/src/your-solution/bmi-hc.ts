
import { calculateBmi } from './bmi-calculator';

try {
  console.log(calculateBmi(180, 74));
} catch (e) {
  console.log('Something went wrong');
}
