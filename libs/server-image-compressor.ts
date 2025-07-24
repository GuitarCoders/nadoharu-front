import sharp from "sharp";

/**
 * 주어진 File 을 `maxSizeBytes` 이하가 될 때까지 압축/리사이즈하여 반환합니다.
 * - 1차: JPEG 품질을 단계적으로 낮추며 시도
 * - 2차: 여전히 크면 해상도를 비례 축소하며 반복
 * 압축 후에도 조건을 만족하지 못하면 가능한 한 작은 용량으로 반환합니다.
 */
export async function compressImageToLimit(
  file: File,
  maxSizeBytes: number = 1_048_576 // 기본 1MB
): Promise<File> {
  if (file.size <= maxSizeBytes) {
    return file;
  }

  // 용량과 상관없이 한 번은 압축 진행
  const arrayBuffer = await file.arrayBuffer();
  // sharp 의 toBuffer() 반환과 타입 호환을 위해 any 캐스팅
  let buffer = Buffer.from(arrayBuffer as ArrayBuffer) as any;

  // 1) 품질 단계적으로 조정
  const qualitySteps = [80, 70, 60, 50, 40, 30, 20, 10];
  for (const quality of qualitySteps) {
    const out = await sharp(buffer).rotate().jpeg({ quality }).toBuffer();

    if (out.byteLength <= maxSizeBytes) {
      return new File([out], file.name.replace(/\.[^.]+$/, ".jpg"), {
        type: "image/jpeg",
      });
    }
  }

  // 2) 해상도를 점차 줄여가며 시도
  const meta = await sharp(buffer).metadata();
  let width = meta.width ?? 1024;
  while (width > 300) {
    width = Math.floor(width * 0.8); // 20% 단위로 축소
    const out = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 75 })
      .toBuffer();

    if (out.byteLength <= maxSizeBytes) {
      return new File([out], file.name.replace(/\.[^.]+$/, ".jpg"), {
        type: "image/jpeg",
      });
    }
    buffer = out; // 다음 루프에서 더 줄이기 위해 업데이트
  }

  // 최종 실패: 가장 마지막 결과를 반환 (조건은 충족 못하지만 최대한 작음)
  return new File([buffer], file.name.replace(/\.[^.]+$/, ".jpg"), {
    type: "image/jpeg",
  });
}
