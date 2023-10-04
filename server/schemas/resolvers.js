const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Appointment} = require("../models");
const { hashPassword } = require("../utils/helpers");


// resolvers graphQL = ROUTES in RESTful APIs -> randle the queries and mutations
// constext from apollo-server to get the headers

const resolvers = {
 
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
  
      const id = context.user._id;
  
      try {
        const userData = await User.findOne({
          _id: id,
        }).select("-__v -password");
  
        return userData;
      } catch (err) {
        console.error(err);
      }
    },

    allAppointments: async (parent, { userId }, context) => {
      try {
        const appointments = await Appointment.find({ userId }) // Use an object to specify the query condition
          .sort({ dateTime: 1 })
          .exec();
        return appointments;
      } catch (error) {
        throw new Error(`Error fetching appointments: ${error.message}`);
      }
    },

    getAppointment: async (parent, args) => {
      const _id = args._id;
      try {
        const appointment = await Appointment.findOne({ _id: _id });
        console.log(appointment);
        return appointment;
      } catch (error) {
        throw new Error("Error fetching appointment: " + error.message);
      }
    },
  },

  Mutation: {
    // Login a user account.
    login: async (parent, { loginName, loginPassword }) => {
      console.log(loginName);
      try {
        if (!loginName)
          throw new AuthenticationError("Need a username or email!");
  
        const user = await User.findOne({
          $or: [{ username: loginName }, { email: loginName }],
        });
  
        if (
          (!user || !(await user.checkPassword(loginPassword, user.password)))
        ) {
          throw new AuthenticationError("Incorrect credentials.");
        }
  
        const loggedInEntity = user;
  
        const token = signToken({
          loggedInEntity,
          role: "user",
        });
  
        return { token, loggedInEntity };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
 
    addUser: async (parent, { userInput }) => {
      const existingUser = await User.findOne({ email: userInput.email });

      if (existingUser)
        throw new Error("Email already taken.");

      const user = await User.create(userInput);
      const token = signToken({ loggedInEntity: user, role: "user" });

      return { token, user };
    },
  
    updateUser: async (parent, { userInput }, context) => {
      const id = context.user._id;

      // Mongoose's pre save hook is not called when using findOneAndUpdate.
      // Hash password here before updating in db.
      if (userInput.password) {
        userInput.password = await hashPassword(userInput.password);
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...userInput,
          },
        },
        {
          new: true,
        }
      );
      return updatedUser;
    },
    addAppointment: async (parent, { appointmentInput }) => {
      try {
        const appointment = await Appointment.create(appointmentInput);
        return appointment ;
      } catch (error) {
        throw new Error("Error adding appointment: " + error.message);
      }

    },

    deleteAppointment: async (parent, { deleteAppointmentInput }, context) => {
      const { _id } = deleteAppointmentInput;
  
      try {
        // Assuming you have a method to delete an appointment by ID
        const deletedAppointment = await Appointment.findByIdAndRemove(_id);
  
        if (!deletedAppointment) {
          throw new Error("Appointment not found or already deleted.");
        }
  
        return deletedAppointment;
      } catch (error) {
        throw new Error("Error deleting appointment: " + error.message);
      }
    },
   
  },
};

module.exports = resolvers;
