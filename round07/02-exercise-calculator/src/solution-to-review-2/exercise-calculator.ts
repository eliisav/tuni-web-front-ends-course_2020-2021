//import { Module } from "module";

interface MultiplyValues {
    totalDays: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (exerciseHours: Array<Number>, targetDays: number)=> { 
    const sum  = exerciseHours.reduce((a, b) => Number(a) + Number(b), 0); 
    const avg = Number(sum) / exerciseHours.length
    const training = exerciseHours.filter(value => value != 0).length
    const calculateRating = training / exerciseHours.length
    let rating;
    let description;
    if(calculateRating < 0.60){
        rating = 1;
        description = 'bad';
    }
    else if(calculateRating >= 0.60 && calculateRating < 0.80){
        rating = 2;
        description = 'not too bad but could be better';
    }   
    else{
        rating = 3
        description = 'great job!';
    }
    let values: MultiplyValues = {
        totalDays: exerciseHours.length,
        trainingDays: training,
        success: ((avg > targetDays) ? true : false),
        rating: rating,
        ratingDescription: description,
        target: targetDays,
        average: avg
    }

    return {
        values
    }

};

export { calculateExercises };





