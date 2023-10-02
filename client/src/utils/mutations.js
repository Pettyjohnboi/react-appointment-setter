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

  export const UPDATE_USER = gql `
  mutation UpdateUser($userInput: UpdateUserInput!) {
    updateUser(userInput: $userInput) {
      _id
      username
      email
    }
  }`;
  export const ADD_APPOINTMENT = gql `
  mutation {
    addAppointment(appointmentInput: {
      name,
      address,
      phone,
      email,
      description,
    }) {
      token
      user {
        _id
        username
        email
      }
    }
  }`;
  export const UPDATE_APPOINTMENT = gql `
  mutation {
    updateAppointment(appointmentInput: {
      appointmentId,
      name,
      address,
      phone,
      email,
      description,
    }) {
      _id
      name
      address
      phone
      email
      website
      description
    }
  }`;
  export const DELETE_USER = gql `
  mutation {
    deleteAppointment(appointmentInput: {
      appointmentId: "your_appointment_id_here"
    }) {
      _id
      name
      address
      phone
      email
      website
      description
    }
  }`;