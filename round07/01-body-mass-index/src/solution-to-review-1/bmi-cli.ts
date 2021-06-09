
import { calculateBmi } from './bmi-calculator';

interface Measurements {
  height: number,
  weight: number
}

const argsParser = (args: Array<string>): Measurements => {
  if (args.length < 4) throw new Error("Too few arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  console.log(args.length);

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Arguments must be numbers");
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

try {
  const { height, weight } = argsParser(process.argv);
  console.log(calculateBmi(height, weight));

} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(e.message);
}