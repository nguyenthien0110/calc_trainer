"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { generateQuestion } from "@/lib/generateQuestion";
import { Question } from "@/types/question";
import QuestionDisplay from "@/components/QuestionDisplay";
import NumberInput from "@/components/NumberInput";
import Timer from "@/components/Timer";

export default function Test() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (testStarted && questions.length === 0) {
      const newQuestions: Question[] = [];
      for (let i = 1; i <= 10; i++) {
        const level = Math.ceil(i / 2); // Gradually increase difficulty
        const operation = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
        newQuestions.push(generateQuestion(operation, level));
      }
      setQuestions(newQuestions);
    }
  }, [testStarted, questions.length]);

  useEffect(() => {
    if (!testStarted || testFinished) return;
    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [testStarted, testFinished]);

  const handleAnswerSubmit = () => {
    if (!questions[currentQuestionIndex]) return;
    const isCorrect =
      parseFloat(userAnswer) === questions[currentQuestionIndex].answer;
    if (isCorrect) setScore(score + 1);
    setUserAnswer("");
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestFinished(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="card flex flex-col gap-6">
      <Link href="/" className="btn-secondary self-start">
        Back to Home
      </Link>
      {!testStarted ? (
        <button onClick={() => setTestStarted(true)} className="btn-primary">
          Start Test
        </button>
      ) : testFinished ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Test Finished!
          </h2>
          <p className="text-lg text-gray-600">Your score: {score}/10</p>
          <p className="text-lg text-gray-600">
            Total time: {formatTime(totalTime)}
          </p>
          <button
            onClick={() => {
              setTestStarted(false);
              setTestFinished(false);
              setScore(0);
              setCurrentQuestionIndex(0);
              setQuestions([]);
              setTotalTime(0);
            }}
            className="btn-primary mt-4"
          >
            Restart Test
          </button>
        </div>
      ) : (
        <>
          <Timer start={testStarted} />
          {questions[currentQuestionIndex] && (
            <QuestionDisplay question={questions[currentQuestionIndex]} />
          )}
          <NumberInput
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleAnswerSubmit}
          />
          <p className="text-lg text-gray-600">
            Question {currentQuestionIndex + 1}/10
          </p>
        </>
      )}
    </div>
  );
}
