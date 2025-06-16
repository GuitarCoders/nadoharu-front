import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PostsByMeQueryVariables = Types.Exact<{
  filter: Types.PostFilter;
  pagination: Types.PaginationInput;
}>;


export type PostsByMeQuery = { __typename?: 'Query', postsByMe: { __typename?: 'PostsQueryResult', posts: Array<{ __typename?: 'Post', _id: string, content: string, tags?: string | null, category?: string | null, createdAt: string, author: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'AboutMe', isFriend: Types.FriendState, isFriendRequested: boolean, friendCount: number, receivedFriendRequestCount: number, user: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } } };


export const PostsByMeDocument = gql`
    query PostsByMe($filter: PostFilter!, $pagination: PaginationInput!) {
  postsByMe(filter: $filter, pagination: $pagination) {
    posts {
      _id
      content
      tags
      category
      createdAt
      author {
        _id
        name
        email
        account_id
        about_me
      }
    }
    pageInfo {
      hasOverStart
      hasOverEnd
      hasNext
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __usePostsByMeQuery__
 *
 * To run a query within a React component, call `usePostsByMeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByMeQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function usePostsByMeQuery(baseOptions: Apollo.QueryHookOptions<PostsByMeQuery, PostsByMeQueryVariables> & ({ variables: PostsByMeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByMeQuery, PostsByMeQueryVariables>(PostsByMeDocument, options);
      }
export function usePostsByMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByMeQuery, PostsByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByMeQuery, PostsByMeQueryVariables>(PostsByMeDocument, options);
        }
export function usePostsByMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostsByMeQuery, PostsByMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByMeQuery, PostsByMeQueryVariables>(PostsByMeDocument, options);
        }
export type PostsByMeQueryHookResult = ReturnType<typeof usePostsByMeQuery>;
export type PostsByMeLazyQueryHookResult = ReturnType<typeof usePostsByMeLazyQuery>;
export type PostsByMeSuspenseQueryHookResult = ReturnType<typeof usePostsByMeSuspenseQuery>;
export type PostsByMeQueryResult = Apollo.QueryResult<PostsByMeQuery, PostsByMeQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    isFriend
    isFriendRequested
    friendCount
    receivedFriendRequestCount
    user {
      _id
      name
      email
      account_id
      about_me
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;