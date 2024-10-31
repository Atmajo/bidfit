import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <input className="bg-transparent outline-none border-b w-max" {...props} />
  );
};

export const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        className="bg-transparent outline-none border-b w-max"
        {...props}
      />
      <Button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

