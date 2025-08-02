"use client";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo, useRef } from "react";

export default function ClientApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientRef = useRef<ApolloClient<unknown> | null>(null);

  const client = useMemo(() => {
    // 이미 생성된 클라이언트가 있으면 재사용
    if (clientRef.current) {
      return clientRef.current;
    }

    const httpLink = createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    });

    // 인증 헤더를 동적으로 설정 - 매번 최신 세션 정보 가져오기
    const authLink = setContext(async (_, { headers }) => {
      try {
        // 매 요청마다 최신 세션 정보를 가져옴 (클로저 문제 해결)
        const response = await fetch("/api/session", {
          credentials: "include",
        });

        if (response.ok) {
          const sessionData = await response.json();
          const authHeader = sessionData.jwt ? `Bearer ${sessionData.jwt}` : "";

          return {
            headers: {
              ...headers,
              authorization: authHeader,
            },
          };
        }

        throw new Error("Hey");
      } catch (error) {
        console.log("🚨 error", error);
      }
    });

    const newClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              postsForTimeline: {
                keyArgs: ["pagination", ["limit"]],
                merge(existing, incoming, { args }) {
                  // 새로고침이나 처음 로드인 경우
                  if (!existing || !args?.pagination?.cursor) {
                    return incoming;
                  }

                  // 무한 스크롤인 경우 - 메모리 사용량 제한
                  const existingPosts = existing.posts || [];
                  const incomingPosts = incoming.posts || [];
                  const combinedPosts = [...existingPosts, ...incomingPosts];

                  // 최대 200개 포스트만 유지 (메모리 관리)
                  const limitedPosts = combinedPosts.slice(-200);

                  return {
                    ...incoming,
                    posts: limitedPosts,
                  };
                },
              },
            },
          },
        },
      }),
      defaultOptions: {
        watchQuery: {
          errorPolicy: "all",
        },
        query: {
          errorPolicy: "all",
        },
      },
    });

    clientRef.current = newClient;
    return newClient;
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
