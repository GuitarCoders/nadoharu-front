export default function RequestedLoading() {
  return (
    <section className="flex flex-col gap-4 p-4">
      {[...Array(10)].map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 shadow-md rounded-md"
        >
          {/* 상단 프로필 영역 */}
          <div className="flex items-center gap-4">
            {/* 프로필 이미지 */}
            <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse shrink-0" />
            {/* 이름 & 아이디 */}
            <div className="flex flex-col gap-1">
              <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
              <div className="w-20 h-3 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
            </div>
            {/* 액션 버튼 영역 */}
            <div className="flex gap-2 ml-auto">
              <div className="w-4 h-8 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
            </div>
          </div>
          {/* 요청 메시지 */}
          <div className="flex flex-col gap-2">
            <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
            <div className="w-2/3 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-md animate-pulse" />
          </div>
        </div>
      ))}
    </section>
  );
}
