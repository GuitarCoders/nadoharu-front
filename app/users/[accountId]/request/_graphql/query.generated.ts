import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserNameByAccountIdQueryVariables = Types.Exact<{
  accountId: Types.Scalars['String']['input'];
}>;


export type UserNameByAccountIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string, name: string } };


export const UserNameByAccountIdDocument = gql`
    query UserNameByAccountId($accountId: String!) {
  userByAccountId(account_id: $accountId) {
    _id
    name
  }
}
    `;

/**
 * __useUserNameByAccountIdQuery__
 *
 * To run a query within a React component, call `useUserNameByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNameByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNameByAccountIdQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useUserNameByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<UserNameByAccountIdQuery, UserNameByAccountIdQueryVariables> & ({ variables: UserNameByAccountIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNameByAccountIdQuery, UserNameByAccountIdQueryVariables>(UserNameByAccountIdDocument, options);
      }
export function useUserNameByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNameByAccountIdQuery, UserNameByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNameByAccountIdQuery, UserNameByAccountIdQueryVariables>(UserNameByAccountIdDocument, options);
        }
export function useUserNameByAccountIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserNameByAccountIdQuery, UserNameByAccountIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserNameByAccountIdQuery, UserNameByAccountIdQueryVariables>(UserNameByAccountIdDocument, options);
        }
export type UserNameByAccountIdQueryHookResult = ReturnType<typeof useUserNameByAccountIdQuery>;
export type UserNameByAccountIdLazyQueryHookResult = ReturnType<typeof useUserNameByAccountIdLazyQuery>;
export type UserNameByAccountIdSuspenseQueryHookResult = ReturnType<typeof useUserNameByAccountIdSuspenseQuery>;
export type UserNameByAccountIdQueryResult = Apollo.QueryResult<UserNameByAccountIdQuery, UserNameByAccountIdQueryVariables>;