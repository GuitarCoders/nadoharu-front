import { Post } from "@/graphql/generated/graphql";
import { atom } from "jotai";

export interface Alert {
  visible: boolean;
  title?: string;
  description?: string;
  descriptionElement?: React.ReactNode;
  closeBtn?: boolean;
  closeBtnAction?: (() => void) | null;
  extraBtn?: boolean;
  extraBtnText?: string;
  extraBtnAction?: (() => void) | null;
  extraBtnColor?: "neutral" | "red" | "green";
  extraBtnLoading?: boolean;
  relogin?: boolean;
}

export const alertAtom = atom<Alert>({
  visible: false,
});

export interface Toast {
  visible: boolean;
  title?: string;
  description?: string;
  undoAction?: () => void;
  duration?: number;
  isError?: boolean;
}

export const toastAtom = atom<Toast>({
  visible: false,
  isError: false,
});

export interface Timeline {
  scrollPosition: number;
  posts: Post[];
  startCursor?: string | null;
  endCursor?: string | null;
  hasOverEnd?: boolean;
  isLoadingOlder?: boolean;
  newPostLoaded?: boolean;
  newPostCount?: number;
  userAccountId?: string;
}

export const timelineScrollStateAtom = atom<Timeline>({
  scrollPosition: 0,
  posts: [],
  startCursor: null,
  endCursor: null,
  hasOverEnd: false,
  isLoadingOlder: false,
  newPostLoaded: false,
  newPostCount: 0,
});
