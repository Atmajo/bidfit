import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <input
      className="bg-transparent outline-none border-b w-max"
      {...props}
    />
  );
};
