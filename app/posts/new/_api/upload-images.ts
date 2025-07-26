"use server";

import { ActionResponse } from "@/app/types/action";

export async function uploadPostImages({
  images,
  uploadUrls,
}: {
  images: File[];
  uploadUrls: string[];
}): Promise<ActionResponse> {
  const filePromises = images.map(async (file, index) => {
    const response = await fetch(uploadUrls[index], {
      method: "PUT",
      body: Buffer.from(await file.arrayBuffer()),
    });
    return response;
  });

  try {
    const responses = await Promise.all(filePromises);
    const success = responses.every((response) => response.ok);
    if (success) {
      return {
        success: true,
      };
    } else {
      throw new Error("이미지 업로드에 실패했습니다.");
    }
  } catch {
    return {
      success: false,
      errorMessage: "이미지 업로드에 실패했습니다.",
    };
  }
}
