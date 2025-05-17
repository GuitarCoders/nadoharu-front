import EmptyState from "@/components/layouts/empty-state";

export default async function Chats() {
  return (
    <section className="flex flex-col divide-y divide-neutral-500 py-1">
      <EmptyState text="아직 채팅방이 없어요" />
      {/* {chatRooms.length === 0 ? (
        <EmptyState text="아직 채팅방이 없어요" />
      ) : (
        chatRooms.map((chatRoom) => (
          <Link
            key={chatRoom.id}
            href={`/chat/${chatRoom.id}`}
            className="flex items-center gap-4 p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <ProfileImage
              avatar={
                chatRoom.initiatorId === session?.id
                  ? chatRoom.recipient.avatar
                  : chatRoom.initiator.avatar
              }
              username={
                chatRoom.initiatorId === session?.id
                  ? chatRoom.recipient.username
                  : chatRoom.initiator.username
              }
              size={10}
            />
            <div className="flex flex-col">
              <p className="font-bold">
                {chatRoom.initiatorId === session?.id
                  ? chatRoom.recipient.username
                  : chatRoom.initiator.username}
              </p>
              <p className="font-medium text-neutral-500">
                {chatRoom.chatMessages[0].content}
              </p>
            </div>
          </Link>
        ))
      )} */}
    </section>
  );
}
