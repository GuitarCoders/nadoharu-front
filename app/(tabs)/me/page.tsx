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
  const posts = await getMyPosts({
    filter: { category: null },
    pagination: { limit: 20 },
  });
  // const reposts = await getReposts(session.id);
  // const friendsCount = await getFriendsCount(session.id);
  // const pendedCount = await getPendedCount(session.id);
  return (
    <>
      <UserInfo
        isMe={true}
        profile={user.me.user}
        friendsCount={0}
        pendedCount={0}
      />
      <UserTimeline
        posts={posts.postsByMe.posts}
        reposts={[]}
        accountId={user.me.user._id}
      />
    </>
  );
}
