import PostImagesPage from "@/app/posts/[postId]/images/page";

export default function PostImagesModal({
  params,
  searchParams,
}: {
  params: { postId: string };
  searchParams?: { page?: string };
}) {
  return <PostImagesPage params={params} searchParams={searchParams} />;
}
