import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import getSession from "./session";

export const getClient = async () => {
  const session = await getSession();
  const jwt = session.jwt;

  return registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
        headers: {
          authorization: jwt ? `Bearer ${jwt}` : "",
        },
      }),
    });
  }).getClient();
};
