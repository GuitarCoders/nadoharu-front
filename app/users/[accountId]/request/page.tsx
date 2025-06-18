import { getReceiveUserByAccountId } from "./data";
import SendRequestForm from "@/components/domains/friend/send-form";

export default async function SendRequest({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId: receiveUserAccountId } = await params;
  const receiveUser = await getReceiveUserByAccountId({
    accountId: receiveUserAccountId,
  });

  return (
    <SendRequestForm
      receiveUserName={receiveUser.userByAccountId.name}
      receiveUserAccountId={receiveUserAccountId}
      receiveUserId={receiveUser.userByAccountId._id}
    />
  );
}
