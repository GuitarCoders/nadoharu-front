import Link from "next/link";
import CommentMenu from "@/components/domains/comment/menu";
import ProfileImage from "@/components/domains/profile/image";

interface CommentProps {
  _id: string;
  content: string;
  commenter: {
    account_id: string;
    name: string;
    profile_image_url?: string | null;
  };
  postId: string;
  isUserComment: boolean;
}

export default function Comment({
  _id,
  content,
  commenter,
  postId,
  isUserComment,
}: CommentProps) {
  return (
    <div className="flex p-4 justify-between">
      <div className="flex gap-4 align-start">
        <Link href={`/users/${commenter.account_id}`} className="flex-shrink-0">
          <ProfileImage
            profileImageUrl={commenter.profile_image_url}
            name={commenter.name}
          />
        </Link>
        <div className="flex flex-col text-sm gap-1">
          <Link
            href={`/users/${commenter.account_id}`}
            className="font-semibold"
          >
            {commenter.name}
          </Link>
          <p>{content}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end w-6 flex-shrink-0">
        <CommentMenu
          isUserComment={isUserComment}
          targetCommentId={_id}
          targetPostId={postId}
        />
      </div>
    </div>
  );
}
