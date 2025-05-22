import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignUpMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  account_id: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } };


export const SignUpDocument = gql`
    mutation SignUp($name: String!, $account_id: String!, $email: String!, $password: String!) {
  createUser(
    createUserData: {name: $name, account_id: $account_id, email: $email, password: $password}
  ) {
    _id
    name
    email
    account_id
    about_me
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      account_id: // value for 'account_id'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;