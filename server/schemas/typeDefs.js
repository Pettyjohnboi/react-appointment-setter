const { gql } = require("apollo-server-express");

// typeDefs = schema Define data in GraphQL
// query is a GET request (reading) - mutation is a POST, PUT, or DELETE request

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Appointment {
    _id: ID
    dateTime: String!
    userId: String!
    name: String!
    address: String
    phone: String
    email: String
    description: String
  }


  type Auth {
    token: ID!
    user: Entity
  }

  type Entity {
    _id: ID
    username: String
    name: String
    email: String
  }

  type Query {
    me: User
    allAppointments(userId: String!): [Appointment]
    getAppointment(_id: ID!): Appointment
  }

  type Mutation {
    addUser(userInput: UserInput!): Auth
    login(loginName: String!, loginPassword: String!): Auth
    updateUser(userInput: UpdateUserInput!): User
    # addAppointment(
    #   name: String!
    #   address: String!
    #   phone: String!
    #   email: String!
    #   description: String!
    # ): Appointment
    addAppointment(appointmentInput: AppointmentInput!): Appointment
    updateAppointment(appointmentId: String!, updateAppointmentInput: UpdateAppointmentInput!): Appointment
    deleteAppointment(deleteAppointmentInput: DeleteAppointmentInput!): Appointment
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  input AppointmentFilters {
    name: String
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input AppointmentInput {
    name: String!
    description: String
    dateTime: String!
    address: String
    phone: String
    email: String
    userId: String!
  }

  input UpdateAppointmentInput {
    name: String!
    description: String
    dateTime: String!
    address: String
    phone: String
    email: String
  }

  input DeleteAppointmentInput {
    _id: ID!
  }

  input UpdateUserInput {
    username: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;