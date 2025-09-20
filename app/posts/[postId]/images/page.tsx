import { notFound } from "next/navigation";
import { getPostImages } from "../data";
import ImagesViewer from "@/components/domains/post/images-viewer";

export default async function PostImagesPage({
  params,
  searchParams,
}: {
  params: { postId: string };
  searchParams?: { page?: string };
}) {
  const { postId } = params;
  const { page } = searchParams ?? {};

  const {
    post: { imageUrls },
  } = await getPostImages({ postId: postId as string });

  if (!imageUrls || imageUrls.length === 0) {
    return notFound();
  }

  // 페이지 번호가 있으면 해당 페이지 번호로 이미지 뷰어 초기 인덱스 설정, 페이지 번호가 없으면 0번째 이미지로 설정 (clamping)
  const initialIndex = page
    ? Math.max(0, Math.min(parseInt(page) - 1, imageUrls.length - 1))
    : 0;

  return <ImagesViewer imageUrls={imageUrls} initialIndex={initialIndex} />;
}
