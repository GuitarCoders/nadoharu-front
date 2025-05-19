import * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetReceiveUserByAccountIdQueryVariables = Types.Exact<{
  accountId: Types.Scalars['String']['input'];
}>;


export type GetReceiveUserByAccountIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string, name: string } };

export type CreateFriendRequestMutationVariables = Types.Exact<{
  receiveUserId: Types.Scalars['String']['input'];
  requestMessage: Types.Scalars['String']['input'];
}>;


export type CreateFriendRequestMutation = { __typename?: 'Mutation', createFriendRequest: { __typename?: 'CreateFriendRequestResult', _id: string, requestMessage: string, createdAt: string, success: boolean, requestUser: { __typename?: 'User', _id: string, name: string }, receiveUser: { __typename?: 'User', _id: string, name: string } } };


export const GetReceiveUserByAccountIdDocument = gql`
    query GetReceiveUserByAccountId($accountId: String!) {
  userByAccountId(account_id: $accountId) {
    _id
    name
  }
}
    `;

/**
 * __useGetReceiveUserByAccountIdQuery__
 *
 * To run a query within a React component, call `useGetReceiveUserByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReceiveUserByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReceiveUserByAccountIdQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetReceiveUserByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetReceiveUserByAccountIdQuery, GetReceiveUserByAccountIdQueryVariables> & ({ variables: GetReceiveUserByAccountIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReceiveUserByAccountIdQuery, GetReceiveUserByAccountIdQueryVariables>(GetReceiveUserByAccountIdDocument, options);
      }
export function useGetReceiveUserByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReceiveUserByAccountIdQuery, GetReceiveUserByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReceiveUserByAccountIdQuery, GetReceiveUserByAccountIdQueryVariables>(GetReceiveUserByAccountIdDocument, options);
        }
export function useGetReceiveUserByAccountIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReceiveUserByAccountIdQuery, GetReceiveUserByAccountIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReceiveUserByAccountIdQuery, GetReceiveUserByAccountIdQueryVariables>(GetReceiveUserByAccountIdDocument, options);
        }
export type GetReceiveUserByAccountIdQueryHookResult = ReturnType<typeof useGetReceiveUserByAccountIdQuery>;
export type GetReceiveUserByAccountIdLazyQueryHookResult = ReturnType<typeof useGetReceiveUserByAccountIdLazyQuery>;
export type GetReceiveUserByAccountIdSuspenseQueryHookResult = ReturnType<typeof useGetReceiveUserByAccountIdSuspenseQuery>;
export type GetReceiveUserByAccountIdQueryResult = Apollo.QueryResult<GetReceiveUserByAccountIdQuery, GetReceiveUserByAccountIdQueryVariables>;
export const CreateFriendRequestDocument = gql`
    mutation CreateFriendRequest($receiveUserId: String!, $requestMessage: String!) {
  createFriendRequest(
    createFriendRequestData: {receiveUserId: $receiveUserId, requestMessage: $requestMessage}
  ) {
    _id
    requestMessage
    createdAt
    success
    requestUser {
      _id
      name
    }
    receiveUser {
      _id
      name
    }
  }
}
    `;
export type CreateFriendRequestMutationFn = Apollo.MutationFunction<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;

/**
 * __useCreateFriendRequestMutation__
 *
 * To run a mutation, you first call `useCreateFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
 *   variables: {
 *      receiveUserId: // value for 'receiveUserId'
 *      requestMessage: // value for 'requestMessage'
 *   },
 * });
 */
export function useCreateFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>(CreateFriendRequestDocument, options);
      }
export type CreateFriendRequestMutationHookResult = ReturnType<typeof useCreateFriendRequestMutation>;
export type CreateFriendRequestMutationResult = Apollo.MutationResult<CreateFriendRequestMutation>;
export type CreateFriendRequestMutationOptions = Apollo.BaseMutationOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;