const { Appointment, User } = require("../models");
const transporter = require('./nodemailer');


// Calculate the current time and the time one hour from now
const currentDate = new Date();
const oneHourLater = new Date(currentDate.getTime() + 60 * 60 * 1000); // Adding one hour in milliseconds

const filter = {
  dateTime: {
    $gte: currentDate, // Appointments starting from the current time
    $lt: oneHourLater, // Appointments ending within the next hour
  },
};

async function sendEmail() {
  try {
    console.log(filter);
    const appointments = await Appointment.find(filter).exec();
    console.log('Appointments within the next hour:', appointments);

    for (let i = 0; i < appointments.length; i++) {
      const appointment = appointments[i];
      const _id = appointment.userId;
      const user = await User.findById(_id);

      if (user) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: appointment.name,
          text: `Your appointment for ${appointment.name} is at ${appointment.dateTime.toLocaleString()}`,
        };
        console.log(user.email);
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(`Error sending email:`, error);
          } else {
            console.log(`Email sent:`, info.response);
          }
        });

        console.log(`Email sent to ${user.email}`);
      } else {
        console.log(`No user found for appointment with ID ${appointment._id}`);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = sendEmail;

