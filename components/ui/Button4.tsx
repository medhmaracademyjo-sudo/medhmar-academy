import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button4({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`
        relative px-6 py-3 rounded-full font-bold text-white
        bg-[#397a34] border-2 border-[#397a34]
        transition-all duration-300
        hover:bg-[#6ab742] hover:border-[#6ab742]
        shadow-md hover:shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
