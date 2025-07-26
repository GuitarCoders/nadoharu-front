"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PostPreviewImages({
  imageUrls,
  postId,
}: {
  imageUrls?: string[] | null;
  postId: string;
}) {
  const router = useRouter();

  if (!imageUrls?.length) return null;

  const onImageClick = (
    event: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    router.push(`/posts/${postId}/images?page=${index + 1}`);
  };

  return imageUrls.length === 1 ? (
    // 사진이 1장일 때는 가로폭을 꽉 채워서 표시
    <Image
      key={imageUrls[0]}
      priority={true}
      src={imageUrls[0]}
      alt="post-photo"
      className="rounded-md object-cover shadow-sm w-full aspect-video cursor-pointer"
      width={1600}
      height={1000}
      onClick={(event) => onImageClick(event, 0)}
    />
  ) : (
    // 사진이 2, 3, 4장 이상일 때 그리드 레이아웃 적용
    <div
      className={`grid gap-2 ${
        imageUrls.length === 3 ? "grid-cols-2 grid-rows-2" : "grid-cols-2"
      }`}
    >
      {imageUrls.map((imageUrl, index) => (
        <Image
          key={imageUrl}
          priority={true}
          src={imageUrl}
          alt="post-photo"
          className={`rounded-md object-cover shadow-sm cursor-pointer ${
            imageUrls.length === 3 && index === 0
              ? "row-span-2 aspect-video"
              : "aspect-video"
          }`}
          width={1600}
          height={1000}
          onClick={(event) => onImageClick(event, index)}
        />
      ))}
    </div>
  );
}
