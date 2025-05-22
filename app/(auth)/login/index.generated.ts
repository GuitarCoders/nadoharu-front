import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLoginQueryVariables = Types.Exact<{
  username: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type GetLoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginResponse', _id: string, name: string, email: string, account_id: string, about_me: string, status: string, jwt_token: string } };


export const GetLoginDocument = gql`
    query GetLogin($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    _id
    name
    email
    account_id
    about_me
    status
    jwt_token
  }
}
    `;

/**
 * __useGetLoginQuery__
 *
 * To run a query within a React component, call `useGetLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetLoginQuery(baseOptions: Apollo.QueryHookOptions<GetLoginQuery, GetLoginQueryVariables> & ({ variables: GetLoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginQuery, GetLoginQueryVariables>(GetLoginDocument, options);
      }
export function useGetLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginQuery, GetLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginQuery, GetLoginQueryVariables>(GetLoginDocument, options);
        }
export function useGetLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLoginQuery, GetLoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLoginQuery, GetLoginQueryVariables>(GetLoginDocument, options);
        }
export type GetLoginQueryHookResult = ReturnType<typeof useGetLoginQuery>;
export type GetLoginLazyQueryHookResult = ReturnType<typeof useGetLoginLazyQuery>;
export type GetLoginSuspenseQueryHookResult = ReturnType<typeof useGetLoginSuspenseQuery>;
export type GetLoginQueryResult = Apollo.QueryResult<GetLoginQuery, GetLoginQueryVariables>;