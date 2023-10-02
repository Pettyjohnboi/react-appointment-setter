const { gql } = require("apollo-server-express");

// typeDefs = schema Define data in GraphQL
// query is a GET request (reading) - mutation is a POST, PUT, or DELETE request

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedAppointment: [Appointment]
  }

  type Appointment {
    _id: ID
    appointmentDate: String
    userId: ID
    name: String!
    address: String!
    phone: String!
    email: String!
    website: String
    description: String!
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

  union MeResult = User | Appointment

  type Query {
    me: MeResult
    allAppointments(filters: AppointmentFilters): [Appointment]
    getAppointment(_id: ID!): Appointment
  }

  type Mutation {
    addUser(userInput: UserInput!): Auth
    login(loginName: String!, loginPassword: String!): Auth
    # addAppointment(
    #   name: String!
    #   address: String!
    #   phone: String!
    #   email: String!
    #   website: String
    #   description: String!
    # ): Appointment
    addAppointment(appointmentInput: AppointmentInput!): Auth
    updateAppointment(appointmentInput: UpdateAppointmentInput!): Appointment
    deleteAppointment(appointmentInput: DeleteAppointmentInput!): Appointment
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  input AppointmentFilters {
    name: String
  }
`;

module.exports = typeDefs;