export default function ProfileSkeleton() {
  return (
    <section>
      <div className="bg-neutral-100 dark:bg-neutral-800 flex flex-col justify-end p-4 gap-3 relative">
        <div className="flex flex-col gap-3 mt-20">
          <div className="absolute right-4 top-4 flex gap-2">
            <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
            <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
          </div>
          <div className="size-20 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="w-24 h-6 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
          <div className="w-3/4 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 h-12 border-b">
        <button className="text-neutral-400">이야기</button>
        <button className="text-neutral-400">미디어</button>
        <button className="text-neutral-400">나도</button>
      </div>
    </section>
  );
}
