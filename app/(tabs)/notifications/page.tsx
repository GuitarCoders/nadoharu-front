import getSession from "@/libs/session";
import EmptyState from "@/components/shared/layouts/empty-state";

async function getNotifications() {
  const session = await getSession();

  return [];
}

export default async function Notification() {
  const notifications = await getNotifications();

  if (!notifications.length) {
    return <EmptyState text="아직 알림이 없어요!" />;
  }

  // return (
  //   <div className="flex flex-col p-4 gap-4">
  //     {notifications.map((noti) => (
  //       <Link
  //         key={noti.id}
  //         href={noti.actionUrl}
  //         className="flex gap-4 p-4 rounded-md shadow-sm dark:bg-neutral-800"
  //       >
  //         <ProfileImage
  //           profile_image_url={noti.initiator.avatar}
  //           username={noti.initiator.username}
  //         />
  //         <div className="flex flex-col gap-1 text-sm">
  //           <h3 className="font-semibold">{NOTIFICATIONS_TITLE[noti.type]}</h3>
  //           <p>{noti.message}</p>
  //         </div>
  //         <div className="my-auto ml-auto">
  //           <ChevronRightIcon className="size-6" />
  //         </div>
  //       </Link>
  //     ))}
  //   </div>
  // );
}
