import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button1({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`
        px-6 py-3 rounded-full font-bold border-2 border-[#397a34] text-[#397a34]
        bg-white relative overflow-hidden
        before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-[#6ab742]/20 before:transition-all before:duration-300 hover:before:w-full
        transition-all duration-300 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
