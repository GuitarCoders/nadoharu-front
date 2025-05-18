import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { InputHTMLAttributes } from "react";

interface TextareaProps {
  errorMessage?: string;
  showLabel?: boolean;
}

function Textarea({
  errorMessage,
  showLabel = false,
  ...attrs
}: TextareaProps & InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-2">
      {showLabel ? (
        <label className="text-sm font-semibold" htmlFor={attrs.id}>
          {attrs.placeholder}
        </label>
      ) : null}
      <textarea
        className="w-full px-4 py-2 border rounded-md shadow-sm outline-none resize-none border-neutral-300 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 dark:bg-neutral-700 dark:text-white"
        rows={3}
        {...attrs}
      />
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

export default Textarea;
