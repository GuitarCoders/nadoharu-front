import imageCompression from "browser-image-compression";

/**
 * 브라우저 사이드에서 이미지를 `maxSizeMB` 이하가 되도록 압축합니다. (기본 1 MB, 최대 해상도 1024px 유지)
 * GIF 파일은 애니메이션 보존을 위해 압축하지 않습니다.
 */
export async function compressImageInBrowser(
  file: File,
  maxSizeMB: number = 1
): Promise<File> {
  // GIF 파일은 압축하지 않고 원본 반환 (애니메이션 보존)
  if (file.type === "image/gif") {
    return file;
  }

  const compressedBlob = await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  });

  // Blob을 File로 변환하여 반환
  return new File([compressedBlob], file.name, {
    type: compressedBlob.type || file.type,
    lastModified: Date.now(),
  });
}
