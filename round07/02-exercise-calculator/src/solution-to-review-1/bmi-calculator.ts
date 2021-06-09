

const calculateBmi = (height: number, weigth: number): string => {
    const bmi = weigth / Math.pow((height / 100), 2)
    if (bmi < 18.5) {
        return "Underweight"
    } else if (bmi < 24.9) {
        return "Normal (healthy weight)"
    } else if (bmi < 29.9) {
        return "Overweight"
    } else {
        return "Obese"
    }
};


export { calculateBmi };
