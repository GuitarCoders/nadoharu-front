import Header from "@/components/layouts/header";
import getSession from "@/libs/session";
import PostHeaderMenu from "@/components/domains/post/header-menu";
import { getPostUser } from "./data";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ postId: string }>;
}

export default async function PostLayout({ children, params }: LayoutProps) {
  const { postId } = await params;
  const session = await getSession();
  const userAccountId = session?.accountId;

  const postUser = await getPostUser({ postId });
  const isUserPost = postUser.author.account_id === userAccountId;

  return (
    <main className="max-w-2xl mx-auto">
      <Header author={postUser.author} canGoBack>
        <PostHeaderMenu isUserPost={isUserPost} postId={postId} />
      </Header>
      <section className="mt-14 mb-20">{children}</section>
    </main>
  );
}
