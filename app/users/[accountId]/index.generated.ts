import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserByAccountIdQueryVariables = Types.Exact<{
  account_id: Types.Scalars['String']['input'];
}>;


export type GetUserByAccountIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } };


export const GetUserByAccountIdDocument = gql`
    query getUserByAccountId($account_id: String!) {
  userByAccountId(account_id: $account_id) {
    _id
    name
    email
    account_id
    about_me
  }
}
    `;

/**
 * __useGetUserByAccountIdQuery__
 *
 * To run a query within a React component, call `useGetUserByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByAccountIdQuery({
 *   variables: {
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useGetUserByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByAccountIdQuery, GetUserByAccountIdQueryVariables> & ({ variables: GetUserByAccountIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByAccountIdQuery, GetUserByAccountIdQueryVariables>(GetUserByAccountIdDocument, options);
      }
export function useGetUserByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByAccountIdQuery, GetUserByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByAccountIdQuery, GetUserByAccountIdQueryVariables>(GetUserByAccountIdDocument, options);
        }
export function useGetUserByAccountIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByAccountIdQuery, GetUserByAccountIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByAccountIdQuery, GetUserByAccountIdQueryVariables>(GetUserByAccountIdDocument, options);
        }
export type GetUserByAccountIdQueryHookResult = ReturnType<typeof useGetUserByAccountIdQuery>;
export type GetUserByAccountIdLazyQueryHookResult = ReturnType<typeof useGetUserByAccountIdLazyQuery>;
export type GetUserByAccountIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByAccountIdSuspenseQuery>;
export type GetUserByAccountIdQueryResult = Apollo.QueryResult<GetUserByAccountIdQuery, GetUserByAccountIdQueryVariables>;