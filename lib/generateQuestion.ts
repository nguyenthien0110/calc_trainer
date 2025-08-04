import { Question } from "@/types/question";

export function generateQuestion(operation: string, level: number): Question {
  // Validate operation
  const validOperations = ["+", "-", "*", "/"];
  const safeOperation = validOperations.includes(operation) ? operation : "+"; // Fallback to "+" if invalid

  let numbers: number[] = [];
  let text: string;
  let answer: number;

  if (level === 5) {
    // Random 3 numbers for level 5
    numbers = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * 100) + 1
    );
  } else {
    // 2 to 5 numbers based on level
    const numCount = level + 1;
    numbers = Array.from(
      { length: numCount },
      () => Math.floor(Math.random() * 100) + 1
    );
  }

  switch (safeOperation) {
    case "+":
      text = numbers.join(" + ");
      answer = numbers.reduce((a, b) => a + b, 0);
      break;
    case "-":
      text = numbers.join(" - ");
      answer = numbers.reduce((a, b) => a - b);
      break;
    case "*":
      text = numbers.join(" × ");
      answer = numbers.reduce((a, b) => a * b, 1);
      break;
    case "/":
      // Ensure division results in a whole number
      numbers = [numbers[0] * numbers[1], numbers[1]]; // First number is product
      text = `${numbers[0]} ÷ ${numbers[1]}`;
      answer = numbers[0] / numbers[1];
      break;
    default:
      // This should never happen due to safeOperation fallback
      text = `${numbers[0]} + ${numbers[1]}`;
      answer = numbers[0] + numbers[1];
  }

  return { text, answer };
}
