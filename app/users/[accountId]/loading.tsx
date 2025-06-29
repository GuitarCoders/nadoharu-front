import PostPreviewSkeleton from "@/components/domains/post/preview-skeleton";
import ProfileSkeleton from "@/components/domains/profile/skeleton";

export default function UserProfileLoading() {
  return (
    <>
      <ProfileSkeleton />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-600">
        {Array.from({ length: 20 }).map((_, index) => (
          <PostPreviewSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
