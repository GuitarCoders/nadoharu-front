import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ContextualBtn } from "../buttons/contextual-menu";

export default function OverlayMenu({
  title,
  buttons,
}: {
  title?: string;
  buttons: ContextualBtn[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // 배경 애니메이션
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // 메뉴 애니메이션
  const menuVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      y: "100%",
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  };

  const buttonColor = (color?: "neutral" | "red" | "green") => {
    switch (color) {
      case "neutral":
        return "text-neutral-500 dark:text-neutral-400";
      case "red":
        return "text-rose-600 dark:text-rose-400";
      case "green":
        return "text-green-500 dark:text-green-400";
      default:
        return "text-black dark:text-white";
    }
  };

  return (
    <>
      <button
        onClick={openMenu}
        className="outline-none flex items-center justify-center"
        aria-label="더 보기"
      >
        <EllipsisVerticalIcon className="size-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center">
            {/* 배경 오버레이 */}
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-xs"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={closeMenu}
            />

            {/* 메뉴 컨테이너 */}
            <motion.div
              className="fixed bottom-0 w-full max-w-md bg-white dark:bg-neutral-900 rounded-t-xl z-50 flex flex-col"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants as Variants}
            >
              {title ? (
                <div className="flex pt-6 pl-6">
                  <h5 className="text-lg font-semibold">{title}</h5>
                </div>
              ) : null}

              {/* 메뉴 항목들 */}
              <div className="flex flex-col w-full py-2">
                {buttons.map((button) => (
                  <button
                    key={button.name}
                    className="flex items-center gap-4 w-full py-4 px-6 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => {
                      button.action();
                      closeMenu();
                    }}
                  >
                    <div className={buttonColor(button.color)}>
                      {button.icon}
                    </div>
                    <span className={buttonColor(button.color)}>
                      {button.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* 취소 버튼 */}
              <div className="p-4 pb-8 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={closeMenu}
                  className="w-full py-3 bg-white dark:bg-neutral-800 rounded-full border border-neutral-300 dark:border-neutral-700 font-medium"
                >
                  취소
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
