"use server";

import Link from "next/link";
import ProfileImage from "@/components/domains/profile/image";
import EmptyState from "@/components/shared/layouts/empty-state";
import { getReceivedFriendRequests } from "./data";
import FriendReceiveMenu from "@/components/domains/friend/receive-menu";

export default async function Requested() {
  const requests = await getReceivedFriendRequests({ limit: 20 });

  return (
    <section className="flex flex-col gap-4 p-4">
      {requests?.receivedFriendRequests.friendRequests.length === 0 ? (
        <EmptyState text="받은 친구 신청이 없어요!" noNav />
      ) : null}
      {requests?.receivedFriendRequests.friendRequests.map((request) => (
        <div
          key={request._id}
          className="flex flex-col gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 shadow-md rounded-md"
        >
          <div className="flex items-center gap-4">
            <Link
              href={`/users/${request.requester.account_id}`}
              className="flex items-center gap-4"
            >
              <ProfileImage
                profileImageUrl={request.requester.profile_image_url}
                name={request.requester.name}
              />
              <div className="flex flex-col">
                <span className="font-medium">{request.requester.name}</span>
                <span className="text-xs text-neutral-500">
                  @{request.requester.account_id}
                </span>
              </div>
            </Link>
            <div className="flex ml-auto">
              <FriendReceiveMenu
                friendRequestId={request._id}
                requestUser={request.requester}
              />
            </div>
          </div>
          {request.requestMessage === "" ? (
            <p className="text-sm text-neutral-500">
              친구 신청 메시지가 없습니다
            </p>
          ) : (
            <p className="text-sm">{request.requestMessage}</p>
          )}
        </div>
      ))}
    </section>
  );
}
