import imageCompression from "browser-image-compression";

/**
 * 브라우저 사이드에서 이미지를 `maxSizeMB` 이하가 되도록 압축합니다. (기본 1 MB, 최대 해상도 1024px 유지)
 */
export async function compressImageInBrowser(
  file: File,
  maxSizeMB: number = 1
): Promise<File> {
  return (await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  })) as File;
}
