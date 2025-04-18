"use client";

import Link from "next/link";
import { formatRelativeTime } from "@/libs/utils";
import PostPreviewButtons from "@/components/domains/post/preview-buttons";
import { useRouter } from "next/navigation";
import ProfileImage from "@/components/domains/profile/image";
import Image from "next/image";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";

interface PostPreviewProps {
  _id: string;
  content: string;
  tags: string;
  createdAt: string;
  commentsCount: number;
  author: {
    _id: string;
    name: string;
    account_id: string;
  };
  userAccountId?: string;
}

export default function PostPreview({
  _id,
  author,
  content,
  tags,
  commentsCount,
  createdAt,
  userAccountId,
}: PostPreviewProps) {
  const router = useRouter();
  // const isUserPost = Number(user.id) === userId;
  // const isUserReposted = reposts.some((repost) => repost?.id);

  const goToUserPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/users/${author._id}`);
  };

  return (
    <Link href={`/posts/${_id}`}>
      <div className="w-full p-4 text-left flex flex-col gap-3">
        {/* {repostUser ? ( */}
        {/*   <div className="flex items-center gap-2 text-neutral-400"> */}
        {/*     <ArrowPathRoundedSquareIcon className="size-3" /> */}
        {/*     <p className="text-xs">{repostUser.username} 님이 공감했어요</p> */}
        {/*   </div> */}
        {/* ) : null} */}

        {/* 프로필 */}
        <section className="flex justify-between items-center">
          <button onClick={goToUserPage} className="flex items-center gap-3">
            <ProfileImage avatar={null} username={author.name} />
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
          isUserReposted={false}
          isUserPost={userAccountId === author.account_id}
          repostCount={0}
          commentCount={commentsCount}
        />
      </div>
    </Link>
  );
}
