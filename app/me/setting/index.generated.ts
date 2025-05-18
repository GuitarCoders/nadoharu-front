import * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserByAccountIdQueryVariables = Types.Exact<{
  account_id: Types.Scalars['String']['input'];
}>;


export type GetUserByAccountIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } };

export type UpdateUserMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  about_me: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserUpdateResult', _id: string, name: string, email: string, account_id: string, about_me: string, status: string } };


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
export const UpdateUserDocument = gql`
    mutation updateUser($name: String!, $about_me: String!, $password: String!) {
  updateUser(
    updateUserData: {name: $name, about_me: $about_me, password: $password}
  ) {
    _id
    name
    email
    account_id
    about_me
    status
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      about_me: // value for 'about_me'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;