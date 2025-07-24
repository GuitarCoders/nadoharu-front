"use server";

import { ActionResponse } from "@/app/types/action";
import { compressImageToLimit } from "@/libs/server-image-compressor";

export async function uploadProfileImage({
  file,
  uploadUrl,
}: {
  file: File;
  uploadUrl: string;
}): Promise<ActionResponse> {
  // 안전망: 서버에서도 한 번 더 용량 체크 (필요 시 압축)
  const safeFile = await compressImageToLimit(file);

  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: Buffer.from(await safeFile.arrayBuffer()),
    });
    if (response.ok) {
      return {
        success: true,
      };
    } else {
      throw new Error("프로필 이미지 업로드에 실패했습니다.");
    }
  } catch {
    return {
      success: false,
      errorMessage: "프로필 이미지 업로드에 실패했습니다.",
    };
  }
}
