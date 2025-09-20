"use server";

import { ActionResponse } from "@/app/types/action";

export async function uploadProfileImage({
  file,
  uploadUrl,
}: {
  file: File;
  uploadUrl: string;
}): Promise<ActionResponse> {
  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: Buffer.from(await file.arrayBuffer()),
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
