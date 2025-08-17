"use client";

import Link from "next/link";
import { formatRelativeTime } from "@/libs/format-relative-time";
import PostPreviewButtons from "@/components/domains/post/preview-buttons";
import { useRouter } from "next/navigation";
import ProfileImage from "@/components/domains/profile/image";
import { Post } from "@/graphql/generated/graphql";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import PostPreviewImages from "./preview-images";

interface PostPreviewProps extends Post {
  isUserPost: boolean;
  className?: string;
}

export default function PostPreview({
  _id,
  author,
  content,
  tags,
  imageUrls,
  createdAt,
  isUserPost,
  commentCount,
  nadoCount,
  isNadoPost,
  isNadoed,
  nadoer,
  className,
}: PostPreviewProps) {
  const router = useRouter();
  const goToUserPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/users/${author.account_id}`);
  };

  return (
    <Link href={`/posts/${_id}`}>
      <div className={`w-full p-4 text-left flex flex-col gap-3 ${className}`}>
        {/* 나도 */}
        {isNadoPost ? (
          <div className="flex items-center gap-2 text-neutral-400">
            <ArrowPathRoundedSquareIcon className="size-3" />
            <p className="text-xs">{nadoer?.name} 님의 나도!</p>
          </div>
        ) : null}

        {/* 프로필 */}
        <section className="flex justify-between items-center">
          <button onClick={goToUserPage} className="flex items-center gap-3">
            <ProfileImage
              profileImageUrl={author.profile_image_url}
              name={author.name}
            />
            <div className="flex flex-col">
              <h2 className="font-semibold text-sm">{author.name}</h2>
            </div>
          </button>
          <p className="text-sm text-neutral-400">
            {formatRelativeTime(new Date(createdAt))}
          </p>
        </section>

        {/* 이미지 */}
        <PostPreviewImages imageUrls={imageUrls} postId={_id} />

        {/* 본문 & 태그 */}
        <p className="whitespace-pre-line break-all">{content}</p>
        <p className="text-sm text-neutral-400">{tags}</p>

        {/* 버튼부 */}
        <PostPreviewButtons
          postId={_id}
          isUserReposted={isNadoed}
          isUserPost={isUserPost}
          nadoCount={nadoCount}
          commentCount={commentCount}
        />
      </div>
    </Link>
  );
}
