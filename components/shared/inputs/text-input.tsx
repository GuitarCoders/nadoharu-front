import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";
import { InputHTMLAttributes } from "react";

interface TextInputProps {
  loading?: boolean;
  errorMessage?: string;
  warning?: string;
  showLabel?: boolean;
}

export default function TextInput({
  errorMessage,
  loading,
  warning,
  showLabel = false,
  ...attrs
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      {showLabel ? (
        <label className="text-sm font-semibold" htmlFor={attrs.id}>
          {attrs.placeholder}
        </label>
      ) : null}
      <input
        autoSave="off"
        autoComplete="off"
        disabled={loading}
        {...attrs}
        className={`appearance-none w-full border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 outline-none focus:ring-2 px-4 py-2 dark:bg-neutral-700 dark:text-white ${
          errorMessage
            ? "ring-rose-700 border-rose-700"
            : "focus:ring-violet-600 focus:border-violet-600"
        }`}
      />
      {warning ? (
        <p className="font-medium flex items-center gap-2 text-sm">
          <ExclamationCircleIcon className="size-4" />
          {warning}
        </p>
      ) : null}
      {errorMessage ? (
        <div className="flex flex-col gap-2">
          <p className="text-red-500 font-medium flex items-center gap-2 text-sm">
            <ExclamationTriangleIcon className="size-4" />
            {errorMessage}
          </p>
        </div>
      ) : null}
    </div>
  );
}
