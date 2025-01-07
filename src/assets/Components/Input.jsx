import React, { useState, useEffect } from "react";
import { useId } from "react";

function Input(
  { label, amount, onChange, currencyOptions = [], selectedCurrency = "NPR", amountDisable = false, currencyDisable = false, className = "", onCurrencyChange, isConverted = false }
) {
  const id = useId();
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (amount !== "") {
      setIsPlaceholder(false);
    }
  }, [amount]);

  const handleAmountChange = (value) => {
    const newValue = value.replace(/^0+/, ''); // Remove leading zeros
    if (/^\d*$/.test(newValue)) { // Ensure only numbers are accepted
      setIsPlaceholder(newValue === "");
      onChange(newValue);
    }
  };

  return (
    <>
      <div
        className={`pt-3 flex flex-col items-center justify-center ${className} bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg`}
      >
        <div className="flex items-center justify-center gap-4">
          <input
            id={id}
            className="pl-6 text-xl font-bold font-mono bg-slate-200 text-black h-[80px] w-[300px] rounded-lg shadow-lg"
            type="number"
            value={isPlaceholder ? "" : amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0"
            disabled={amountDisable || isConverted}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <select
            id={id}
            className="pl-6 text-xl font-bold font-mono bg-slate-200 h-[80px] w-[150px] rounded-lg shadow-lg"
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            disabled={currencyDisable || isConverted}
          >
            <option value="" disabled hidden>0</option>
            {currencyOptions.map((option) => (
              <option className="text-black" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Input;
