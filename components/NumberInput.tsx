"use client";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function NumberInput({
  value,
  onChange,
  onSubmit,
}: NumberInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow digits, decimal point, and negative sign
    if (inputValue === "" || /^-?\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border-2 border-gray-300 rounded-lg p-3 w-full text-center focus:outline-none focus:border-gray-500 transition-colors duration-200"
        placeholder="Enter a number"
        pattern="^-?\d*\.?\d*$"
        inputMode="numeric"
      />
      <button
        onClick={onSubmit}
        className="btn-primary"
        disabled={!value || isNaN(parseFloat(value))}
      >
        Submit
      </button>
    </div>
  );
}
