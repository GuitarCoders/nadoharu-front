import getSession from "@/libs/session";
import { notFound, redirect } from "next/navigation";
import SendRequestForm from "@/components/domains/friend/send-form";
import { getReceiveUserByAccountId } from "./data";

export default async function SendRequest({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId: receiveUserAccountId } = await params;
  const receiveUser = await getReceiveUserByAccountId(receiveUserAccountId);

  return (
    <SendRequestForm
      receiveUserName={receiveUser.userByAccountId.name}
      receiveUserAccountId={receiveUserAccountId}
      receiveUserId={receiveUser.userByAccountId._id}
    />
  );
}
