import { gql } from "@apollo/client";

export const GET_ME = gql`
query {
    me {
      _id
      username
      email
      savedAppointment {
        _id
        name
        address
        phone
        email
        website
        description
      }
    }
  }`;

export const GET_ALL_APPOINTMENTS = gql`
query allAppointments($userId: String!) {
  allAppointments(userId: $userId) {
      _id
      dateTime
      userId
      name
      address
      phone
      email
  }
}
`;



export const GET_APPOINTMENT = gql`
query getAppointment($_id: ID!) {
    getAppointment(_id: $_id) {
        _id
        dateTime
        userId
        name
        address
        phone
        email
    }
  }
`;