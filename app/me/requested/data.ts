import { getClient } from "@/libs/apollo-client";
import { PaginationFrom, PaginationSort } from "@/graphql/generated/graphql";
import {
  ReceivedFriendRequestsDocument,
  ReceivedFriendRequestsQuery,
  ReceivedFriendRequestsQueryVariables,
} from "./_graphql";

export async function getReceivedFriendRequests({
  limit,
  cursor,
}: {
  limit: number;
  cursor?: string;
}): Promise<ReceivedFriendRequestsQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<
      ReceivedFriendRequestsQuery,
      ReceivedFriendRequestsQueryVariables
    >({
      query: ReceivedFriendRequestsDocument,
      variables: {
        pagination: {
          from: PaginationFrom.End,
          limit,
          cursor,
          sort: PaginationSort.Desc,
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
