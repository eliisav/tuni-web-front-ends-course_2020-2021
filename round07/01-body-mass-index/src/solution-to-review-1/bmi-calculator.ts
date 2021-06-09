
const calculateBmi = (height: number, weight: number): string  => {
  if (weight <= 0 || height <= 0) throw new Error("Values have to be positive!");

  const meterHeight = height / 100;
  const BMI = weight / Math.pow(meterHeight, 2);

  if (BMI < 15) return "Very severely underweight";
  if (BMI < 16) return "Severely underweight";
  if (BMI < 18.5) return "Underweight";
  if (BMI < 25) return "Normal (healthy weight)";
  if (BMI < 30) return "Overweight";
  if (BMI < 35) return "Obese Class I (Moderately obese)";
  if (BMI < 40) return "Obese Class II (Severely obese)";
  return "Obese Class III (Very severely obese)";
};

export { calculateBmi };
