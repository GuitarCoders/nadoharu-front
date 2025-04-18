import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const getClient = (token?: string) =>
  registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      }),
    });
  });
