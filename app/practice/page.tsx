import Link from "next/link";

export default function Practice() {
  const operations = ["+", "-", "*", "/"];
  return (
    <div className="card flex flex-col gap-6">
      <Link href="/" className="btn-secondary self-start">
        Back to Home
      </Link>
      <h2 className="text-3xl font-semibold text-gray-800">Select Operation</h2>
      <div className="grid grid-cols-2 gap-4">
        {operations.map((op) => (
          <Link
            key={op}
            href={`/practice/${encodeURIComponent(op)}`}
            className="btn-primary text-center"
          >
            {op}
          </Link>
        ))}
      </div>
    </div>
  );
}
