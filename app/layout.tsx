import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calc Trainer",
  description: "A math practice and testing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-200 min-h-screen flex flex-col items-center justify-center p-6`}
      >
        <header className="w-full max-w-3xl mb-10 text-center">
          <Link
            href="https://github.com/nguyenthien0110/calc_trainer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 absolute top-0 right-0 p-4"
            title="View on GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.756-1.333-1.756-1.087-.744.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02-.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .319.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </Link>
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Calc Trainer
          </h1>
          <p className="text-gray-600 mt-2">
            Practice and master your math skills!
          </p>
        </header>
        <main className="w-full max-w-3xl bg-gray-50 rounded-xl shadow-2xl p-8 transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
