import { notFound } from "next/navigation";
import getSession from "@/libs/session";
import UserTimeline from "@/components/domains/post/user-timeline";
import UserInfo from "@/components/layouts/user-info";
import { getMyPosts, getWhoAmI } from "./data";

export const metadata = {
  title: "나는",
};

export default async function Me() {
  const user = await getWhoAmI();
  if (!user) {
    return notFound();
  }
  const posts = await getMyPosts(user.userWhoAmI._id);
  console.log(posts);
  // const reposts = await getReposts(session.id);
  // const friendsCount = await getFriendsCount(session.id);
  // const pendedCount = await getPendedCount(session.id);
  return (
    <>
      <UserInfo
        isMe={true}
        profile={user.userWhoAmI}
        friendsCount={0}
        pendedCount={0}
      />
      <UserTimeline
        posts={posts}
        reposts={[]}
        accountId={user.userWhoAmI._id}
      />
    </>
  );
}
