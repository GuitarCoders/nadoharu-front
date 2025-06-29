export default function UserFriendsLoading() {
  return (
    <section className="flex flex-col p-4 gap-4">
      {/* 친구 요청 안내 영역 */}
      <div className="flex justify-between h-8 items-center">
        <div className="w-32 h-6 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
        <div className="w-20 h-6 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
      </div>

      {/* 친구 목록 */}
      <div className="flex flex-col gap-4">
        {[...Array(10)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4">
            {/* 프로필 이미지 */}
            <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse shrink-0" />
            <div className="flex flex-col gap-1">
              <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
              <div className="w-20 h-3 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
