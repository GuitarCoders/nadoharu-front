import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import ClientApolloProvider from "../components/providers/apollo-provider";
import Providers from "../components/providers/jotai-provider";
import { ThemeProvider } from "../components/providers/theme-provider";
import type { ReactNode } from "react";

// Storybook 프리뷰 환경에서 /api/session 페치 목킹 (Apollo 인증 헤더 의존성 완화)
if (typeof window !== "undefined") {
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.endsWith("/api/session")) {
      return new Response(JSON.stringify({ jwt: "" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return originalFetch(input, init);
  };
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story: () => ReactNode) => (
      <Providers>
        <ClientApolloProvider>
          <ThemeProvider>{Story()}</ThemeProvider>
        </ClientApolloProvider>
      </Providers>
    ),
  ],
};

export default preview;
