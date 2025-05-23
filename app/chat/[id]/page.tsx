import ChatBubble from "@/components/domains/chat/bubble";
import ChatInput from "@/components/domains/chat/input";
import { notFound } from "next/navigation";

export default async function ChatDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chatId = Number(id);
  if (isNaN(chatId)) {
    return notFound();
  }

  return (
    <section>
      <div className="flex flex-col gap-4 p-4">
        <ChatBubble
          message="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          avatar={null}
          name="test"
        />
        <ChatBubble
          message="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          avatar={null}
          name="test2"
          reversed={true}
        />
      </div>
      <ChatInput name="content" placeholder="채팅 입력.." />
    </section>
  );
}
