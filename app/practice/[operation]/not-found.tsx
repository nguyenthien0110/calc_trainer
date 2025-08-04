import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card text-center">
      <h2 className="text-3xl font-semibold text-red-600">Invalid Operation</h2>
      <p className="text-lg text-gray-600">Please select a valid operation.</p>
      <Link href="/practice" className="btn-primary mt-4 inline-block">
        Back to Practice
      </Link>
      <Link href="/" className="btn-secondary mt-2 inline-block">
        Back to Home
      </Link>
    </div>
  );
}
