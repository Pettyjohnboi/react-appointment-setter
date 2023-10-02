import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation addUser($userInput: UserInput!) {
    addUser(userInput: $userInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }`;