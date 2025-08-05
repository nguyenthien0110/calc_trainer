import { Question } from "@/types/question";

export function generateQuestion(operation: string, level: number): Question {
  const validOperations = ["+", "-", "*", "/"];
  const safeOperation = validOperations.includes(operation) ? operation : "+"; // Fallback to "+"
  let numbers: number[] = [];
  let text: string;
  let answer: number;

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  switch (safeOperation) {
    case "+":
      if (level === 1) {
        // Level 1: Simple addition (0–10, 2 numbers)
        numbers = [getRandomInt(0, 10), getRandomInt(0, 10)];
        text = numbers.join(" + ");
        answer = numbers.reduce((a, b) => a + b, 0);
      } else if (level === 2) {
        // Level 2: Larger numbers (0–50, 2 numbers)
        numbers = [getRandomInt(0, 50), getRandomInt(0, 50)];
        text = numbers.join(" + ");
        answer = numbers.reduce((a, b) => a + b, 0);
      } else if (level === 3) {
        // Level 3: 3 numbers (0–50)
        numbers = [
          getRandomInt(0, 50),
          getRandomInt(0, 50),
          getRandomInt(0, 50),
        ];
        text = numbers.join(" + ");
        answer = numbers.reduce((a, b) => a + b, 0);
      } else if (level === 4) {
        // Level 4: 4 numbers with parentheses (0–100)
        const n1 = getRandomInt(0, 100);
        const n2 = getRandomInt(0, 100);
        const n3 = getRandomInt(0, 100);
        const n4 = getRandomInt(0, 100);
        text = `(${n1} + ${n2}) + (${n3} + ${n4})`;
        answer = n1 + n2 + (n3 + n4);
      } else {
        // Level 5: Hundreds (0–500, 3–4 numbers)
        const numCount = Math.random() < 0.5 ? 3 : 4;
        numbers = Array.from({ length: numCount }, () => getRandomInt(0, 500));
        text = numbers.join(" + ");
        answer = numbers.reduce((a, b) => a + b, 0);
      }
      break;

    case "-":
      if (level === 1) {
        // Level 1: Simple subtraction (0–10, 2 numbers)
        numbers = [getRandomInt(0, 10), getRandomInt(0, 10)];
        numbers.sort((a, b) => b - a); // Ensure positive result
        text = numbers.join(" - ");
        answer = numbers.reduce((a, b) => a - b);
      } else if (level === 2) {
        // Level 2: Subtraction within 50 (0–50, 2 numbers)
        numbers = [getRandomInt(0, 50), getRandomInt(0, 50)];
        numbers.sort((a, b) => b - a);
        text = numbers.join(" - ");
        answer = numbers.reduce((a, b) => a - b);
      } else if (level === 3) {
        // Level 3: Consecutive subtraction (0–100, 3 numbers)
        numbers = [
          getRandomInt(50, 100),
          getRandomInt(0, 50),
          getRandomInt(0, 50),
        ];
        numbers.sort((a, b) => b - a); // Ensure positive intermediate results
        text = numbers.join(" - ");
        answer = numbers.reduce((a, b) => a - b);
      } else if (level === 4) {
        // Level 4: Subtraction with parentheses (0–100, 3–4 numbers)
        const n1 = getRandomInt(50, 100);
        const n2 = getRandomInt(0, 50);
        const n3 = getRandomInt(0, 50);
        const numCount = Math.random() < 0.5 ? 3 : 4;
        if (numCount === 3) {
          text = `${n1} - (${n2} + ${n3})`;
          answer = n1 - (n2 + n3);
        } else {
          const n4 = getRandomInt(0, 50);
          text = `${n1} - (${n2} + ${n3} + ${n4})`;
          answer = n1 - (n2 + n3 + n4);
        }
      } else {
        // Level 5: Hundreds (0–500, 3–4 numbers)
        const numCount = Math.random() < 0.5 ? 3 : 4;
        numbers = [
          getRandomInt(200, 500),
          ...Array.from({ length: numCount - 1 }, () => getRandomInt(0, 200)),
        ];
        numbers.sort((a, b) => b - a); // Ensure positive result
        text = numbers.join(" - ");
        answer = numbers.reduce((a, b) => a - b);
      }
      break;

    case "*":
      if (level === 1) {
        // Level 1: Multiplication tables (1–5, 2 numbers)
        numbers = [getRandomInt(1, 5), getRandomInt(1, 5)];
        text = numbers.join(" × ");
        answer = numbers.reduce((a, b) => a * b, 1);
      } else if (level === 2) {
        // Level 2: Multiplication tables (1–9, 2 numbers)
        numbers = [getRandomInt(1, 9), getRandomInt(1, 9)];
        text = numbers.join(" × ");
        answer = numbers.reduce((a, b) => a * b, 1);
      } else if (level === 3) {
        // Level 3: 2-digit × 1-digit (0–20 × 1–9)
        numbers = [getRandomInt(0, 20), getRandomInt(1, 9)];
        text = numbers.join(" × ");
        answer = numbers.reduce((a, b) => a * b, 1);
      } else if (level === 4) {
        // Level 4: 3 small numbers (1–15)
        numbers = [
          getRandomInt(1, 15),
          getRandomInt(1, 15),
          getRandomInt(1, 15),
        ];
        text = numbers.join(" × ");
        answer = numbers.reduce((a, b) => a * b, 1);
      } else {
        // Level 5: Larger numbers (10–50, 2 numbers)
        numbers = [getRandomInt(10, 50), getRandomInt(10, 50)];
        text = numbers.join(" × ");
        answer = numbers.reduce((a, b) => a * b, 1);
      }
      break;

    case "/":
      if (level === 1) {
        // Level 1: Division tables (1–50, divisible)
        const divisor = getRandomInt(1, 10);
        const quotient = getRandomInt(1, 5);
        numbers = [divisor * quotient, divisor];
        text = `${numbers[0]} ÷ ${numbers[1]}`;
        answer = numbers[0] / numbers[1];
      } else if (level === 2) {
        // Level 2: Larger division (1–100, divisible)
        const divisor = getRandomInt(1, 10);
        const quotient = getRandomInt(1, 10);
        numbers = [divisor * quotient, divisor];
        text = `${numbers[0]} ÷ ${numbers[1]}`;
        answer = numbers[0] / numbers[1];
      } else if (level === 3) {
        // Level 3: Consecutive division (1–100)
        const divisor1 = getRandomInt(2, 5);
        const divisor2 = getRandomInt(2, 5);
        const quotient = getRandomInt(4, 20);
        numbers = [divisor1 * divisor2 * quotient, divisor1, divisor2];
        text = `${numbers[0]} ÷ ${numbers[1]} ÷ ${numbers[2]}`;
        answer = numbers[0] / numbers[1] / numbers[2];
      } else if (level === 4) {
        // Level 4: Division with addition/subtraction (1–100)
        const divisor = getRandomInt(2, 10);
        const quotient = getRandomInt(2, 10);
        const addSub = getRandomInt(1, 10);
        const isAdd = Math.random() < 0.5;
        numbers = [divisor * quotient, divisor];
        text = isAdd
          ? `(${numbers[0]} ÷ ${numbers[1]}) + ${addSub}`
          : `(${numbers[0]} ÷ ${numbers[1]}) - ${addSub}`;
        answer = isAdd
          ? numbers[0] / numbers[1] + addSub
          : numbers[0] / numbers[1] - addSub;
      } else {
        // Level 5: Non-divisible (1–500, decimal result)
        numbers = [getRandomInt(1, 500), getRandomInt(2, 20)];
        text = `${numbers[0]} ÷ ${numbers[1]}`;
        answer = numbers[0] / numbers[1]; // Decimal result
      }
      break;

    default:
      // Fallback: Simple addition
      numbers = [getRandomInt(0, 10), getRandomInt(0, 10)];
      text = numbers.join(" + ");
      answer = numbers.reduce((a, b) => a + b, 0);
  }

  return { text, answer };
}
