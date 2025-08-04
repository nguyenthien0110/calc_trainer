"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  start: boolean;
}

export default function Timer({ start }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-lg font-semibold text-gray-700 bg-gray-100 py-2 px-4 rounded-lg">
      Time: {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}
