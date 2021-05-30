
import { calculateBmi } from './bmi-calculator';

try {
  console.log(calculateBmi(180, 74));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something went wrong, error message: ', e.message);
}
