import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
