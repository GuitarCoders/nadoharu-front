"use server";

import ReceiveRequestForm from "@/components/domains/friendship/receive-form";
import Link from "next/link";
import ProfileImage from "@/components/domains/profile/image";
import EmptyState from "@/components/layouts/empty-state";
import { getReceivedFriendRequests } from "./action";

export default async function Requested() {
  const requests = await getReceivedFriendRequests();

  return (
    <section className="flex flex-col gap-4 p-4">
      {requests?.getReceiveFriendRequests?.friendRequests.length === 0 ? (
        <EmptyState text="받은 친구 신청이 없어요!" noNav />
      ) : null}
      {requests?.getReceiveFriendRequests?.friendRequests.map((request) => (
        <div
          key={request._id}
          className="flex flex-col gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 shadow-md rounded-md"
        >
          <Link
            href={`/users/${request.requestUser.account_id}`}
            className="flex items-center gap-4"
          >
            <ProfileImage avatar={null} name={request.requestUser.name} />
            <div className="flex flex-col">
              <span className="font-medium">{request.requestUser.name}</span>
              <span className="text-xs text-neutral-500">
                @{request.requestUser.account_id}
              </span>
            </div>
          </Link>
          {request.requestMessage === "" ? (
            <p className="text-sm text-neutral-500">
              친구 신청 메시지가 없습니다
            </p>
          ) : (
            <p className="text-sm">{request.requestMessage}</p>
          )}
          <ReceiveRequestForm
            id={request._id}
            createdAt={new Date(request.createdAt)}
            requestUser={request.requestUser}
            receiveUserId={request.receiveUser._id}
            requestUserId={request.requestUser._id}
            requestMessage={request.requestMessage}
          />
        </div>
      ))}
    </section>
  );
}
