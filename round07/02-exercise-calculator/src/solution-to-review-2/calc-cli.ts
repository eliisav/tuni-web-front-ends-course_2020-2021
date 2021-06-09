import { calculateExercises } from './exercise-calculator';



interface MultiplyValues {
  target: number;
  totalDays: Array<Number>;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let invalid = false
  const daysArray = []
  for(var i = 3; i < args.length; i++){
    if(!isNaN(Number(args[i]))){
      daysArray.push(Number(args[i]))
    }
    else{
      invalid = true
    }
  }

  if (!isNaN(Number(args[2])) && !invalid) {
    return {
      target: Number(args[2]),
      totalDays: daysArray
    }
  } else {
    throw new Error('Provided values were not valid!');
  }
}

try {
    const { target, totalDays } = parseArguments(process.argv);
    console.log("------------");
    console.log("Command line result is:")
    console.log(calculateExercises(totalDays, target));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
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
