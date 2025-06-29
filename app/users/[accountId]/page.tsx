import UserInfo from "@/components/shared/layouts/user-info";
import UserTimeline from "@/components/domains/post/user-timeline";
import getSession from "@/libs/session";
import { notFound } from "next/navigation";
import { getPostsByUserId, getUserByAccountId } from "./data";

export default async function Users({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  const user = await getUserByAccountId({ account_id: accountId });
  if (!user) {
    return notFound();
  }
  const posts = await getPostsByUserId({
    targetUserId: user.userByAccountId._id,
    category: "",
    limit: 20,
    until: null,
  });

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
      <UserTimeline
        posts={posts.postsByUserId.posts}
        reposts={[]}
        accountId={user.userByAccountId._id}
      />
    </>
  );
}
