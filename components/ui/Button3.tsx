import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button3({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`
        relative px-6 py-3 rounded-full font-semibold border-2 border-[#397a34] text-[#397a34]
        bg-white transition-all duration-300
        hover:bg-[#f0fdf4] hover:border-[#6ab742]
        shadow-sm hover:shadow-md
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
