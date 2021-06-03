
import { calculateBmi } from './bmi-calculator';


try {
  console.log(calculateBmi(180, 74));

} catch (e) {
  if (e instanceof Error) {
    console.log('Something went wrong, error message: ', e.message);
  } else {
    console.log('Something went wrong');
  }

}
