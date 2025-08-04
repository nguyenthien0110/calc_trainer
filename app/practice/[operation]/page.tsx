"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateQuestion } from "@/lib/generateQuestion";
import { Question } from "@/types/question";
import QuestionDisplay from "@/components/QuestionDisplay";
import NumberInput from "@/components/NumberInput";
import LevelSelector from "@/components/LevelSelector";

export default function PracticeOperation({
  params,
}: {
  params: Promise<{ operation: string }>;
}) {
  const router = useRouter();
  const { operation: encodedOperation } = use(params); // Unwrap params using React.use()
  const operation = decodeURIComponent(encodedOperation || "") || "+"; // Fallback to "+"

  // Log operation for debugging
  useEffect(() => {
    console.log("Raw operation:", encodedOperation);
    console.log("Decoded operation:", operation);
  }, [encodedOperation, operation]);

  // Validate operation
  const validOperations = ["+", "-", "*", "/"];
  const normalizedOperation = operation.trim();
  const isValidOperation = validOperations.includes(normalizedOperation);

  // Redirect if operation is invalid
  useEffect(() => {
    if (encodedOperation && !isValidOperation) {
      console.log("Redirecting due to invalid operation:", normalizedOperation);
      const timer = setTimeout(() => {
        router.push("/practice");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [encodedOperation, isValidOperation, operation, router]);

  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isValidOperation) {
      setQuestion(generateQuestion(normalizedOperation, level));
    }
  }, [level, normalizedOperation, isValidOperation]);

  const handleAnswerSubmit = () => {
    if (!question) return;
    const isAnswerCorrect = parseFloat(userAnswer) === question.answer;
    setIsCorrect(isAnswerCorrect);
    setFeedback(
      isAnswerCorrect
        ? "Correct!"
        : `Incorrect. Try again or skip to the next question.`
    );
    setUserAnswer(""); // Clear input after submission
  };

  const handleNextQuestion = () => {
    setQuestion(generateQuestion(normalizedOperation, level));
    setUserAnswer("");
    setFeedback("");
    setIsCorrect(false);
  };

  if (!encodedOperation || !isValidOperation) {
    return (
      <p className="text-red-600 text-center">
        Invalid operation. Redirecting...
      </p>
    );
  }

  return (
    <div className="card flex flex-col gap-6">
      <Link href="/" className="btn-secondary self-start">
        Back to Home
      </Link>
      <LevelSelector level={level} setLevel={setLevel} />
      {question && <QuestionDisplay question={question} />}
      <NumberInput
        value={userAnswer}
        onChange={setUserAnswer}
        onSubmit={handleAnswerSubmit}
      />
      {feedback && (
        <div className="flex flex-col gap-4">
          <p
            className={`text-lg ${
              feedback.includes("Correct") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
          {(isCorrect || feedback.includes("Incorrect")) && (
            <button
              onClick={handleNextQuestion}
              className="btn-primary self-center"
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}
