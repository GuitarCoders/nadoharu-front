"use server";

import { gql } from "@apollo/client";
import { getClient } from "@/libs/apollo-client";
import { ActionResponse } from "@/app/types/action";

export interface SignUpFormData {
  name: string;
  account_id: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  createUser: {
    _id: string;
    name: string;
    email: string;
    account_id: string;
    about_me: string;
    friends: string[];
  };
}

const mutation = gql`
  mutation SignUp(
    $name: String!
    $account_id: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      createUserData: {
        name: $name
        account_id: $account_id
        email: $email
        password: $password
      }
    ) {
      _id
      name
      email
      account_id
      about_me
      # friends
    }
  }
`;

export async function signUp(
  variables: SignUpFormData,
): Promise<ActionResponse> {
  try {
    const client = getClient();
    const { data } = await client.mutate<SignUpResponse>({
      mutation,
      variables,
    });

    if (data) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      errors: error,
    };
  }
}
