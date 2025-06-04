import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserNameByAccountIdQueryVariables = Types.Exact<{
  accountId: Types.Scalars['String']['input'];
}>;


export type UserNameByAccountIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string, name: string } };

export type CreateFriendRequestMutationVariables = Types.Exact<{
  createFriendRequestData: Types.CreateFriendRequest;
}>;


export type CreateFriendRequestMutation = { __typename?: 'Mutation', createFriendRequest: { __typename?: 'CreateFriendRequestResult', _id: string, requestMessage: string, createdAt: string, success: boolean, requester: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }, receiver: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } } };


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
export const CreateFriendRequestDocument = gql`
    mutation CreateFriendRequest($createFriendRequestData: CreateFriendRequest!) {
  createFriendRequest(createFriendRequestData: $createFriendRequestData) {
    _id
    requestMessage
    createdAt
    success
    requester {
      _id
      name
      email
      account_id
      about_me
    }
    receiver {
      _id
      name
      email
      account_id
      about_me
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
 *      createFriendRequestData: // value for 'createFriendRequestData'
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