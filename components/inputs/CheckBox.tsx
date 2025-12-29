"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CheckboxInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  description?: string;
  className?: string;
  dir?: boolean; // optional, default ltr
}

export default function CheckboxInput({
  label,
  register,
  error,
  description,
  className = "",
  dir = false,
}: CheckboxInputProps) {
  const id =
    register?.name ?? `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;

  return (
    <div className={`mb-4 ${className}`} dir={dir ? "rtl" : "ltr"}>
      <label
        htmlFor={id}
        className="flex items-center gap-3 text-gray-700 cursor-pointer select-none"
      >
        <input
          id={id}
          type="checkbox"
          {...register}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
          className={`w-4 h-4 border rounded-sm focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-600 focus:ring-red-500" : "border-gray-300"}`}
        />
        <span className="text-sm font-medium">{label}</span>
      </label>

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-7">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 ml-7">
          {error.message}
        </p>
      )}
    </div>
  );
}
