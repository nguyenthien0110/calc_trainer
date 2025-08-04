import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/practice"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
      >
        Practice Mode
      </Link>
      <Link
        href="/test"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center"
      >
        Test Mode
      </Link>
    </div>
  );
}
