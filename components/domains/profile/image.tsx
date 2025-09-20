import Image from "next/image";

interface ProfileImageProps {
  profileImageUrl?: string | null;
  name: string;
  size?: number;
}

export default function ProfileImage({
  profileImageUrl,
  name,
  size = 10,
}: ProfileImageProps) {
  const width = size * 4;
  const height = size * 4;

  return profileImageUrl ? (
    <Image
      src={profileImageUrl}
      alt={name}
      width={width}
      height={height}
      className={`size-${size} rounded-md bg-neutral-200 dark:bg-neutral-600 object-cover shadow-sm`}
    />
  ) : (
    <div
      className={`size-${size} rounded-md bg-neutral-200 dark:bg-neutral-600 shadow-sm`}
    />
  );
}
