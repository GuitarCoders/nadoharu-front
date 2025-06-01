import Link from "next/link";
import CommentMenu from "@/components/domains/comment/menu";
import ProfileImage from "@/components/domains/profile/image";

interface CommentProps {
  avatar: string | null;
  username: string;
  content: string;
  accountId: string;
  isUserComment: boolean;
  commentId: string;
  postId: string;
}

export default function Comment({
  avatar,
  username,
  content,
  accountId,
  isUserComment,
  commentId,
  postId,
}: CommentProps) {
  return (
    <div className="flex p-4 justify-between">
      <div className="flex gap-4 align-start">
        <Link href={`/users/${accountId}`} className="flex-shrink-0">
          <ProfileImage avatar={avatar} name={username} />
        </Link>
        <div className="flex flex-col text-sm gap-1">
          <Link href={`/users/${accountId}`} className="font-semibold">
            {username}
          </Link>
          <p>{content}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end w-6 flex-shrink-0">
        <CommentMenu
          isUserComment={isUserComment}
          targetCommentId={commentId}
          targetPostId={postId}
        />
      </div>
    </div>
  );
}
