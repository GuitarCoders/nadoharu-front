import { notFound } from "next/navigation";
import getSession from "@/libs/session";
import UserTimeline from "@/components/domains/post/user-timeline";
import UserInfo from "@/components/layouts/user-info";
import { getMyPosts, getUser } from "./data";

export const metadata = {
  title: "나는",
};

export default async function Me() {
  const { accountId } = await getSession();
  if (!accountId) {
    return notFound();
  }
  const user = await getUser(accountId);
  console.log(user);
  if (!user) {
    return notFound();
  }
  const posts = await getMyPosts(user.userByAccountId._id);
  console.log(posts);
  // const reposts = await getReposts(session.id);
  // const friendsCount = await getFriendsCount(session.id);
  // const pendedCount = await getPendedCount(session.id);
  return (
    <>
      <UserInfo
        isMe={true}
        profile={user.userByAccountId}
        friendsCount={0}
        pendedCount={0}
      />
      <UserTimeline posts={posts} reposts={[]} accountId={accountId} />
    </>
  );
}
