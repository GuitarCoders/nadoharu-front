import Header from "@/components/layouts/header";
import { notFound } from "next/navigation";
import getSession from "@/libs/session";
import PostDetailMoreBtns from "@/components/domains/post/more-buttons";
import { getPostUser } from "./data";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function PostLayout({ children, params }: LayoutProps) {
  const { id: postId } = await params;
  const session = await getSession();
  const userAccountId = session?.accountId;

  const postUser = await getPostUser(postId);
  const isUserPost = postUser.author.account_id === userAccountId;

  return (
    <main className="max-w-2xl mx-auto">
      <Header author={postUser.author} canGoBack>
        <PostDetailMoreBtns isUserPost={isUserPost} postId={postId} />
      </Header>
      <section className="mt-14 mb-20">{children}</section>
    </main>
  );
}
