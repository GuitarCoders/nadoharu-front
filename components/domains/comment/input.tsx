import { FlexibleTextarea } from "@/components/shared/inputs";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { TextareaHTMLAttributes } from "react";

interface CommentInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: string[];
  pending?: boolean;
}

export default function CommentInput({ pending, ...attrs }: CommentInputProps) {
  return (
    <div className="fixed bottom-0 px-2 pt-2 pb-6 w-full max-w-2xl mx-auto bg-neutral-100 dark:bg-neutral-800">
      <div className="relative">
        <FlexibleTextarea
          initialRows={1}
          disabled={pending}
          hasButton
          maxRows={5}
          {...attrs}
        />
        <button
          className="absolute right-2 bottom-[9px] text-md p-1 bg-violet-400 rounded-md text-white disabled:bg-neutral-400 disabled:text-neutral-800 disabled:cursor-not-allowed"
          disabled={pending}
        >
          <ArrowUpIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
