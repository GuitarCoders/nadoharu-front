"use client";

import { NextPage } from "next";

interface SubmitButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  color?: "violet" | "red" | "gray";
  pending?: boolean;
  pendingText?: string;
  className?: string;
}

const SubmitButton: NextPage<SubmitButtonProps> = ({
  text,
  type = "submit",
  onClick,
  color = "violet",
  pending,
  pendingText = "로딩 중...",
  className,
}) => {
  const buttonColor = (color: "violet" | "red" | "gray") => {
    switch (color) {
      case "violet":
        return "bg-violet-400 dark:bg-violet-600 focus:ring-violet-600 text-white";
      case "red":
        return "bg-rose-600 focus:ring-rose-700 text-white";
      case "gray":
        return "bg-neutral-300 focus:ring-neutral-400 text-white";
    }
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={pending}
      className={`px-4 py-2 rounded-md outline-none focus:ring-2 ${buttonColor(
        pending ? "gray" : color
      )} ${pending ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {pending ? pendingText : text}
    </button>
  );
};

export default SubmitButton;
