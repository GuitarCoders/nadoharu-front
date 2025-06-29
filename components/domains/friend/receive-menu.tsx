"use client";

import ContextualMenu, {
  ContextualBtn,
} from "@/components/shared/buttons/contextual-menu";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { toastAtom } from "@/libs/atoms";
import { acceptFriendRequest } from "@/app/me/requested/action";
import { deleteFriendRequest } from "@/app/me/requested/action";
import { useRouter } from "next/navigation";
import { User } from "@/graphql/generated/graphql";

export default function FriendReceiveMenu({
  friendRequestId,
  requestUser,
}: {
  friendRequestId: string;
  requestUser: User;
}) {
  const router = useRouter();
  const setToast = useSetAtom(toastAtom);

  const goToMePage = () => {
    router.push(`/me`);
  };

  const onDeleteClick = async () => {
    const result = await deleteFriendRequest({ friendRequestId });
    if (result.success) {
      setToast({
        visible: true,
        isError: false,
        title: "친구 신청을 삭제했습니다",
      });
      goToMePage();
    } else {
      setToast({
        visible: true,
        isError: true,
        title: result.errorMessage,
      });
    }
  };

  const onAcceptClick = async () => {
    const result = await acceptFriendRequest({ friendRequestId });
    if (result.success) {
      setToast({
        visible: true,
        isError: false,
        title: "친구 신청을 수락했습니다",
      });
      goToMePage();
    } else {
      setToast({
        visible: true,
        isError: true,
        title: result.errorMessage,
      });
    }
  };

  const buttons: ContextualBtn[] = [
    {
      name: "수락하기",
      icon: <CheckIcon className="size-5" />,
      action: onAcceptClick,
      color: "green",
    },
    {
      name: "삭제하기",
      icon: <TrashIcon className="size-5" />,
      action: onDeleteClick,
      color: "red",
    },
  ];

  const title = `${requestUser.name}님의 친구 신청`;

  return <ContextualMenu title={title} buttons={buttons} />;
}
