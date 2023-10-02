const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Appointment} = require("../models");
const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// resolvers graphQL = ROUTES in RESTful APIs -> randle the queries and mutations
// constext from apollo-server to get the headers

const resolvers = {
  MeResult: {
    __resolveType(obj, contextValue, info) {
      if (obj.description) {
        return "Appointment";
      }
      if (obj.username) {
        return "User";
      }
    },
  },
  Query: {
    // The currently logged in user.
    me: async (parent, args, context) => {
      const role = context.user.role;
      const id = context.user._id;
      try {
        if (role === "user") {
          const userData = await User.findOne({
            _id: id,
          }).select("-__v -password");

          return userData;
        }

        throw new AuthenticationError("Not logged in");
      } catch (err) {
        console.error(err);
      }
    },
    allAppointments: async (parent, { filters }, context) => {
      try {
        let query = {};
    
        if (filters?.name) {
          query.name = { $regex: filters.name, $options: "i" };
        }
    
        const appointments = await Appointment.find(query);
    
        return appointments;
      } catch (err) {
        throw new Error("Error fetching appointments: " + err);
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
    loginUser: async (parent, { loginName, loginPassword }) => {
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
   
  },
};

module.exports = resolvers;
