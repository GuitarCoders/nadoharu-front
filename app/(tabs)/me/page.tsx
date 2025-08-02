import { notFound } from "next/navigation";
import UserTimeline from "@/components/domains/post/user-timeline";
import UserInfo from "@/components/shared/layouts/user-info";
import { getMyPosts, getWhoAmI } from "./data";

export const metadata = {
  title: "나는",
};

export default async function Me() {
  const user = await getWhoAmI();
  if (!user) {
    return notFound();
  }
  const posts = await getMyPosts({ limit: 20 });

  return (
    <>
      <UserInfo
        isMe={true}
        profile={user.me.user}
        friendsCount={user.me.friendCount}
        pendedCount={user.me.receivedFriendRequestCount}
      />
      <UserTimeline
        posts={posts.postsByMe.posts}
        reposts={[]}
        accountId={user.me.user._id}
      />
    </>
  );
}
