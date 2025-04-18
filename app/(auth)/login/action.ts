"use server";

import { gql } from "@apollo/client";
import { getClient } from "@/libs/apollo-client";
import getSession from "@/libs/session";
import { ActionResponse } from "@/app/types/action";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  login: {
    _id: string;
    name: string;
    email: string;
    account_id: string;
    about_me: string;
    friends: string[];
    status: string;
    jwt_token: string;
  };
}

const query = gql`
  query GetLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      name
      email
      account_id
      about_me
      status
      jwt_token
    }
  }
`;

export async function login(variables: LoginFormData): Promise<ActionResponse> {
  try {
    const client = getClient();
    const { data } = await client.query<LoginResponse>({
      query,
      variables,
    });

    if (data) {
      const session = await getSession();
      session.accountId = data.login.account_id;
      session.jwt = data.login.jwt_token;
      await session.save();
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      ok: false,
    };
  }
}
