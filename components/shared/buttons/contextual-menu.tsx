import { JSX } from "react";
import { useDeviceDetection } from "@/hooks";
import DropdownMenu from "@/components/shared/layouts/dropdown-menu";
import OverlayMenu from "@/components/shared/layouts/overlay-menu";

export type ContextualBtn = {
  action: () => void;
  name: string;
  icon: JSX.Element;
  color?: "neutral" | "red" | "green";
};

export default function ContextualMenu({
  title,
  buttons,
}: {
  buttons: ContextualBtn[];
  title?: string;
}) {
  const { isMobile } = useDeviceDetection();
  return isMobile ? (
    <OverlayMenu title={title} buttons={buttons} />
  ) : (
    <DropdownMenu buttons={buttons} />
  );
}
