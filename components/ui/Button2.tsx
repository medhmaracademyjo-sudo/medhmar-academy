import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button2({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`
        px-6 py-3 rounded-full font-bold text-white
        bg-[#397a34] border-2 border-[#397a34] relative overflow-hidden
        before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-white/10 before:transition-all before:duration-300 hover:before:w-full
        transition-all duration-300 hover:text-white
        shadow-md hover:shadow-xl
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
