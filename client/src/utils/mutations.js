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
    }
  }`;

export const UPDATE_APPOINTMENT = gql `
  mutation updateAppointment($appointmentInput: UpdateAppointmentInput!){
    updateAppointment(appointmentInput:$appointmentInput) { 
      appointmentId,
      name,
      address,
      phone,
      email,
      description,
    }
  }`;