import { notFound } from "next/navigation";
import getSession from "@/libs/session";
import { getPosts } from "./data";
import PostsWithPtr from "@/components/domains/post/posts-with-ptr";

export const metadata = {
  title: "모아보는",
};

export default async function Posts() {
  const session = await getSession();
  const userAccountId = session.accountId;

  const data = await getPosts({ pagination: { limit: 20 } });
  if (!data) {
    return notFound();
  }
  const {
    postsForTimeline: { posts },
  } = data;

  return (
    <PostsWithPtr
      initialPosts={posts}
      initialCursor={data.postsForTimeline.pageInfo.cursor}
      userAccountId={userAccountId}
    />
  );
}
