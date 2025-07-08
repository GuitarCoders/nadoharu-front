import Comment from "@/components/domains/comment";
import getSession from "@/libs/session";
import { formatRelativeTime } from "@/libs/utils";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import CommentForm from "@/components/domains/comment/form";
import RepostForm from "@/components/domains/post/repost-form";
import { getPostDetail, getComments } from "./data";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const { post } = await getPostDetail({ postId });
  if (!post) {
    return notFound();
  }

  const { comments } = await getComments({ postId, limit: 10 });

  const session = await getSession();
  const isUserPost = session.accountId === post.author.account_id;

  // const isReposted = await getIsReposted(postId, session.id);
  // const isUserPost = await getIsUserPost(post.userId);

  return (
    <>
      <section className="divide-y divide-neutral-400 dark:divide-neutral-800 pb-16">
        {/* 본문 */}
        <div className="flex flex-col p-4 gap-2">
          {/* {post.photos.length ? (
             <div className="grid grid-cols-2 gap-2 mb-4"> 
               {post.photos.map((photo) => ( 
                 <Link href={`${photo}/public`} key={photo}> 
                   <Image 
                     src={photo + "/avatar"} 
                     alt="post-photo" 
                     className="rounded-md aspect-video object-cover" 
                     width={1600} 
                     height={1000} 
                   /> 
                 </Link> 
               ))} 
             </div> 
           ) : null}  */}
          <h5>{post.content}</h5>
          <p className="text-sm text-neutral-400">{post.tags}</p>
          <div className="flex justify-between pt-6 items-center">
            <div>
              <p className="text-xs text-neutral-400">
                {formatRelativeTime(new Date(post.createdAt))}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <ArrowPathRoundedSquareIcon className="text-violet-600 dark:text-violet-400 size-5" />
                <p>{post.nadoCount}</p>
              </div>
              <div className="flex items-center gap-2">
                <ChatBubbleOvalLeftEllipsisIcon className="text-violet-600 dark:text-violet-400 size-5" />
                <p>{post.commentCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* 나도 */}
          <div className="flex gap-4 px-4 h-16 items-center border-b border-neutral-400 dark:border-neutral-800">
            <RepostForm
              postId={postId}
              isReposted={post.isNadoed}
              nadoCount={post.nadoCount}
            />
            <p className="text-sm text-neutral-400">이 글에 공감한다면 나도!</p>
          </div>
          <div className="flex flex-col divide-y divide-neutral-400 dark:divide-neutral-800">
            {comments.comments.map((comment) => (
              <Comment
                key={comment._id}
                isUserComment={
                  comment.commenter.account_id === session.accountId
                }
                {...comment}
              />
            ))}
          </div>
        </div>
      </section>
      <CommentForm postId={postId} />
    </>
  );
}
