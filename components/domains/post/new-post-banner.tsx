import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

interface NewPostBannerProps {
  count: number;
}

export default function NewPostBanner({ count }: NewPostBannerProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white rounded-full px-4 py-2 text-xs flex items-center gap-2 z-10"
    >
      <ArrowUpIcon className="size-3" />
      <span>{`새로운 글이 ${count}건 있어요!`}</span>
    </motion.div>
  );
}
