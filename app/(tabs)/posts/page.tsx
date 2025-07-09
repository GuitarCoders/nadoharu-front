import { notFound } from "next/navigation";
import getSession from "@/libs/session";
import { getNewerPosts } from "./data";
import PostWithPtr from "@/components/domains/post/posts-with-ptr";

export const metadata = {
  title: "모아보는",
};

const INITIAL_LIMIT = 10;

export default async function Posts() {
  const session = await getSession();
  const userAccountId = session.accountId;

  const data = await getNewerPosts({ limit: INITIAL_LIMIT });
  if (!data) {
    return notFound();
  }
  const {
    postsForTimeline: { posts },
  } = data;

  return (
    <PostWithPtr
      initialItemCount={INITIAL_LIMIT}
      initialPosts={posts}
      initialStartCursor={data.postsForTimeline.pageInfo.startCursor}
      initialEndCursor={data.postsForTimeline.pageInfo.endCursor}
      initialHasOverStart={data.postsForTimeline.pageInfo.hasOverStart}
      initialHasOverEnd={data.postsForTimeline.pageInfo.hasOverEnd}
      userAccountId={userAccountId}
    />
  );
}
