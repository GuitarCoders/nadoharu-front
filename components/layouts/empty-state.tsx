import { FaceSmileIcon } from "@heroicons/react/24/solid";

export default function EmptyState({
  text,
  noNav,
  userInfo,
}: {
  text: string;
  noNav?: boolean;
  userInfo?: boolean;
}) {
  const height = {
    full: "h-[calc(100dvh-152px)]",
    noNav: "h-[calc(100dvh-56px)]",
    userInfo: "h-[350px]",
  };
  return (
    <section
      className={`flex flex-col gap-6 justify-center items-center ${
        height[noNav ? "noNav" : userInfo ? "userInfo" : "full"]
      } text-gray-400`}
    >
      <FaceSmileIcon className="size-10" />
      <h3 className="font-medium text-lg">{text}</h3>
    </section>
  );
}
