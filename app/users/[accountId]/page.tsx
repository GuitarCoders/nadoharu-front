import UserInfo from "@/components/shared/layouts/user-info";
import UserTimeline from "@/components/domains/post/user-timeline";
import getSession from "@/libs/session";
import { notFound } from "next/navigation";
import { getUserByAccountId } from "./data";

export default async function Users({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  const user = await getUserByAccountId(accountId);
  if (!user) {
    return notFound();
  }

  const session = await getSession();
  const isMe = user.userByAccountId._id === session?.accountId;

  return (
    <>
      <UserInfo
        isMe={isMe}
        profile={user.userByAccountId}
        isFriend={false}
        isPending={false}
        isPended={false}
        friendsCount={0}
      />
      <div className="text-center">유저별 타임라인 기능 미구현</div>
      {/* <UserTimeline posts={[]} reposts={[]} accountId={user.userByAccountId._id} /> */}
    </>
  );
}
