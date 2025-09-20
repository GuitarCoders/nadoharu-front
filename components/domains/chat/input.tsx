import { FlexibleTextarea } from "@/components/shared/inputs";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { TextareaHTMLAttributes } from "react";

interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  pending?: boolean;
}

export default function ChatInput({ pending, ...attrs }: ChatInputProps) {
  return (
    <div className="fixed bottom-4 p-4 w-full max-w-2xl mx-auto">
      <div className="relative">
        <FlexibleTextarea
          placeholder="메시지를 입력하세요."
          initialRows={1}
          disabled={pending}
          {...attrs}
        />
        <button
          className="absolute right-2 top-[9px] text-md p-2 bg-violet-400 rounded-3xl text-white disabled:bg-neutral-400 disabled:text-neutral-800 disabled:cursor-not-allowed"
          disabled={pending}
        >
          <ArrowUpIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
