import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFriendRequestMutationVariables = Types.Exact<{
  createFriendRequestData: Types.CreateFriendRequest;
}>;


export type CreateFriendRequestMutation = { __typename?: 'Mutation', createFriendRequest: { __typename?: 'CreateFriendRequestResult', success: boolean } };


export const CreateFriendRequestDocument = gql`
    mutation CreateFriendRequest($createFriendRequestData: CreateFriendRequest!) {
  createFriendRequest(createFriendRequestData: $createFriendRequestData) {
    success
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