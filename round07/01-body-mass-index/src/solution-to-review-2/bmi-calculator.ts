

const calculateBmi = (height: number, mass: number): string  => {
  const bmi = mass / (height / 100 ) ** 2;
  let result;
  if (bmi > 0 && bmi < 15)
    result = "Very severely underweight";
  else if (bmi >= 15 && bmi < 16)
    result = "Severely underweight";
  else if (bmi >= 16 && bmi < 18.5)
    result = "Underweight";
  else if (bmi >= 18.5 && bmi < 25)
    result = "Normal (healthy weight)";
  else if (bmi >= 25 && bmi < 30)
    result = "Overweight";
  else if (bmi >= 30 && bmi < 35)
    result = "Obese Class I (Moderately obese)";
  else if (bmi >= 35 && bmi < 40)
    result = "Obese Class II (Severely obese)";
  else if (bmi >= 40)
    result = "Obese Class III (Very severely obese)";
  else
    result = "NA";

 return result;
};


export { calculateBmi };
