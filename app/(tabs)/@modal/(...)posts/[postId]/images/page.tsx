import { notFound } from "next/navigation";
import ImagesViewer from "@/components/domains/post/images-viewer";
import { getPostImages } from "@/app/posts/[postId]/data";

export default async function PostImagesModal({
  params,
  searchParams,
}: {
  params: Promise<{ postId: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { postId } = await params;
  const s = (await searchParams) ?? {};
  const { page } = s;

  const {
    post: { imageUrls },
  } = await getPostImages({ postId });

  if (!imageUrls || imageUrls.length === 0) {
    return notFound();
  }

  const initialIndex = page
    ? Math.max(0, Math.min(parseInt(page) - 1, imageUrls.length - 1))
    : 0;

  return <ImagesViewer imageUrls={imageUrls} initialIndex={initialIndex} />;
}
