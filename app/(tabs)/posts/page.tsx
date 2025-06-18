import { notFound } from "next/navigation";
import getSession from "@/libs/session";
import { getNewerPosts } from "./data";
import PostsWithPtr from "@/components/domains/post/posts-with-ptr";
import { PaginationFrom } from "@/graphql/generated/graphql";

export const metadata = {
  title: "모아보는",
};

export default async function Posts() {
  const session = await getSession();
  const userAccountId = session.accountId;

  const data = await getNewerPosts({ limit: 5 });
  if (!data) {
    return notFound();
  }
  const {
    postsForTimeline: { posts },
  } = data;

  return (
    <PostsWithPtr
      initialPosts={posts}
      initialStartCursor={data.postsForTimeline.pageInfo.startCursor}
      initialEndCursor={data.postsForTimeline.pageInfo.endCursor}
      userAccountId={userAccountId}
    />
  );
}
