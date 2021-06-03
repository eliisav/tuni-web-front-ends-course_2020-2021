
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const average = hours.length !== 0
    ? hours.reduce((acc, cur) => acc + cur) / hours.length
    : 0;
  
  /* Rating:
      3, average === target, goal achieved
      2, average is 80 % or more of the target
      1, average is less than 80 % of the target
  */

  let rating = 3;
  let description = 'great, goal achieved';

  if (target !== 0) {
    const percentage = average/target;

    if (percentage >= 0.8 && percentage < 1 ) {
      rating = 2;
      description = 'not too bad but could be better';
      
    } else if (percentage < 0.8) {
      rating = 1;
      description = 'well... you could do much better';
    }
  }
  
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average
  };
};

export { calculateExercises };





