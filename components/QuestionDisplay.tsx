import { Question } from "@/types/question";

interface QuestionDisplayProps {
  question: Question;
}

export default function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className="text-3xl font-semibold text-gray-800 text-center bg-gray-100 py-4 px-6 rounded-lg shadow-inner">
      {question.text} =
    </div>
  );
}
