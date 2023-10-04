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

  export const LOGIN_USER = gql`
  mutation login($loginName: String!, $loginPassword: String!) {
    login(loginName: $loginName, loginPassword: $loginPassword) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

  export const UPDATE_USER = gql `
  mutation updateUser($userInput: UpdateUserInput!) {
    updateUser(userInput: $userInput) {
      _id
      username
      email
    }
  }`;
  export const ADD_APPOINTMENT = gql `
  mutation addAppointment ($appointmentInput: AppointmentInput!){
    addAppointment(appointmentInput: $appointmentInput) {
      name,
      address,
      phone,
      email,
      description,
      dateTime,
      userId,
    }
  }`;

export const UPDATE_APPOINTMENT = gql `
  mutation updateAppointment($appointmentInput: UpdateAppointmentInput!){
    updateAppointment(appointmentInput:$appointmentInput) { 
      name,
      address,
      phone,
      email,
      description,
    }
  }`;
  export const Delete_APPOINTMENT = gql `
  mutation deleteAppointment($deleteAppointmentInput: DeleteAppointmentInput!){
    deleteAppointment(deleteAppointmentInput:$deleteAppointmentInput) {
      _id,
    }
  }`;