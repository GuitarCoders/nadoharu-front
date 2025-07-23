import EmptyState from "@/components/shared/layouts/empty-state";
import ProfileImage from "@/components/domains/profile/image";
import getSession from "@/libs/session";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getFriends, getUserId } from "./data";

export default async function Friends({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  const session = await getSession();
  const isMe = session.accountId === accountId;

  const {
    userByAccountId: { _id: targetUserId },
  } = await getUserId({
    accountId,
  });

  // TODO: 백엔드에서 친구수 0일 경우 error 반환하는 오류 있으므로 고쳐지면 재확인
  const { friends } = await getFriends({
    targetUserId,
    limit: 20,
  });

  // TODO: 받은 친구신청 수 구현
  const pendingFriendsCount = 1;

  return (
    <section className="flex flex-col p-4 gap-4">
      {isMe && pendingFriendsCount > 0 ? (
        <div className="flex items-center justify-between h-8">
          <span className="text-sm text-neutral-500">
            {pendingFriendsCount}명의 친구 요청이 도착했어요.
          </span>
          <Link
            href="/me/requested"
            className="text-violet-600 dark:text-white font-bold text-sm flex items-center gap-2"
          >
            <span>보러가기</span>
            <ChevronRightIcon className="size-4" />
          </Link>
        </div>
      ) : null}
      {friends.friends.length === 0 ? (
        <EmptyState text="친구 목록이 비었습니다" noNav />
      ) : null}
      <div className="flex flex-col gap-4">
        {friends.friends.map((friend) => (
          <Link
            key={friend.user._id}
            href={`/users/${friend.user.account_id}`}
            className="flex items-center gap-4"
          >
            <ProfileImage
              profile_image_url={friend.user.profile_image_url}
              name={friend.user.name}
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm">{friend.user.name}</span>
              <span className="text-xs text-neutral-500">
                @{friend.user.account_id}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
