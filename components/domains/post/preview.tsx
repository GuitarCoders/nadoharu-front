"use client";

import Link from "next/link";
import { formatRelativeTime } from "@/libs/utils";
import PostPreviewButtons from "@/components/domains/post/preview-buttons";
import { useRouter } from "next/navigation";
import ProfileImage from "@/components/domains/profile/image";
import { Post } from "@/graphql/generated/graphql";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

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
        {/* TODO: '나도' 누른 글을 표시하는 경우에 대한 기능 구현 */}
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

        {/* 본문 & 태그 */}
        <p>{content}</p>
        <p className="text-sm text-neutral-400">{tags}</p>

        {/* 이미지 */}
        {/* TODO: 이미지가 있는 경우에 대한 기능 구현 */}
        {/* {photos.length ? ( */}
        {/*   <div className="grid grid-cols-2 gap-2"> */}
        {/*     {photos.map((photo) => ( */}
        {/*       <Image */}
        {/*         key={photo} */}
        {/*         priority={true} */}
        {/*         src={photo + "/avatar"} */}
        {/*         alt="post-photo" */}
        {/*         className="rounded-md aspect-video object-cover shadow-sm" */}
        {/*         width={1600} */}
        {/*         height={1000} */}
        {/*       /> */}
        {/*     ))} */}
        {/*   </div> */}
        {/* ) : null} */}

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
