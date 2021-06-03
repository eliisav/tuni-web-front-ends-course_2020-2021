
import { calculateExercises } from './exercise-calculator';

interface TrainingHours {
  dailyHours: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): TrainingHours => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const argsAsNumbers = args.slice(2).map( n => {
    if (!isNaN(Number(n))) {
      return Number(n);
    } else {
      throw new Error('Invalid arguments!');
    }
  });

  return {
    dailyHours: argsAsNumbers.slice(1),
    target: argsAsNumbers[0]
  };
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));

} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  } else {
    console.log('Error, something bad happened');
  }

}

/*

>>> test case 1:

npm start cli  2 3 0 2 4.5 0 3 1


{ 
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 
}

>>> test case 2:

npm start cli 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 
}

*/
