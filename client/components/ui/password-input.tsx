"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input, { InputProps } from "./input";

type PasswordInputProps = Omit<InputProps, "type" | "trailing">;

export default function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}