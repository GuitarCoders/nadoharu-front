"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { toastAtom } from "@/libs/atoms";
import { sendFriendRequest } from "@/app/users/[accountId]/request/action";
import SubmitButton from "@/components/shared/buttons/submit-button";
import Textarea from "@/components/shared/inputs/textarea";
import { useForm } from "react-hook-form";

interface FriendshipSendFormProps {
  receiveUserName: string;
  receiveUserAccountId: string;
  receiveUserId: string;
}

interface SendFriendRequestForm {
  requestMessage: string;
}

export default function FriendshipSendForm({
  receiveUserName,
  receiveUserAccountId,
  receiveUserId,
}: FriendshipSendFormProps) {
  const router = useRouter();
  const setToast = useSetAtom(toastAtom);
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendFriendRequestForm>();

  const onSendFriendRequestSubmit = async ({
    requestMessage,
  }: SendFriendRequestForm) => {
    setPending(true);
    const result = await sendFriendRequest({
      receiveUserId,
      requestMessage,
    });
    setPending(false);
    if (result?.createFriendRequest?.success) {
      setToast({
        visible: true,
        title: "친구 신청을 보냈습니다.",
      });

      router.push(`/users/${receiveUserAccountId}`);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 p-4"
      onSubmit={handleSubmit(onSendFriendRequestSubmit)}
    >
      <Textarea
        placeholder={`${receiveUserName}님, 저랑 친구해요!`}
        {...register("requestMessage")}
        errorMessage={errors.requestMessage?.message}
      />
      <SubmitButton
        text="친구 신청 보내기"
        pending={pending}
        pendingText="친구 신청 보내는 중..."
      />
    </form>
  );
}
