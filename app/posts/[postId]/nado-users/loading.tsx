export default function NadoUsersListPageLoading() {
  return (
    <section className="flex flex-col divide-y divide-neutral-400 dark:divide-neutral-800">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex gap-3 items-center px-4 py-3">
          {/* 프로필 이미지 */}
          <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse shrink-0" />
          <div className="flex flex-col gap-1">
            {/* 이름 */}
            <div className="w-20 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
            {/* 계정 ID */}
            <div className="w-16 h-3 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
          </div>
        </div>
      ))}
    </section>
  );
}
