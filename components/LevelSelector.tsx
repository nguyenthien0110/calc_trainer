"use client";

interface LevelSelectorProps {
  level: number;
  setLevel: (level: number) => void;
}

export default function LevelSelector({ level, setLevel }: LevelSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold text-gray-700">
        Select Level
      </label>
      <select
        value={level}
        onChange={(e) => setLevel(parseInt(e.target.value))}
        className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-500 transition-colors duration-200"
      >
        {[1, 2, 3, 4, 5].map((lvl) => (
          <option key={lvl} value={lvl}>
            Level {lvl}
          </option>
        ))}
      </select>
    </div>
  );
}
