import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // 모달이 아래에서 위로 나타나는 애니메이션
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" }, // 시작: 투명하고 약간 아래에 위치
          "100%": { opacity: "1", transform: "translateY(0)" }, // 끝: 불투명하고 제자리에 위치
        },
        // 모달이 위에서 아래로 사라지는 애니메이션 (선택 사항)
        fadeOutDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
        overlayShow: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        overlayHide: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.3s ease-out forwards", // 나타날 때 0.3초 동안 ease-out 효과
        fadeOutDown: "fadeOutDown 0.3s ease-in forwards", // 사라질 때 0.3초 동안 ease-in 효과
        overlayShow: "overlayShow 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        overlayHide: "overlayHide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
