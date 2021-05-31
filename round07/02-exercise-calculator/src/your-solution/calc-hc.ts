
import { calculateExercises } from './exercise-calculator';


/*

test case:

[3, 0, 2, 4.5, 0, 3, 1], 2   =>

{
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286
}

*/

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something went wrong, error message: ', e.message);
}
