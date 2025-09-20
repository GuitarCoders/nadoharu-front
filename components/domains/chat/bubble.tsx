import ProfileImage from "@/components/domains/profile/image";

interface ChatBubbleProps {
  message: string;
  profile_image_url?: string | null;
  reversed?: boolean;
  name: string;
}

export default function ChatBubble({
  message,
  profile_image_url,
  reversed,
  name,
}: ChatBubbleProps) {
  return (
    <div className={`flex gap-3 ${reversed ? "justify-end" : "justify-start"}`}>
      {!reversed ? (
        <ProfileImage profileImageUrl={profile_image_url} name={name} />
      ) : null}
      <div
        className={`flex items-center p-3 rounded-lg max-w-[70%] ${
          reversed ? "bg-violet-500" : "bg-neutral-800"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
