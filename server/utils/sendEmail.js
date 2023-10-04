const { Appointment, User } = require("../models"); // Import Appointment and User models
const transporter = require('./nodemailer');

const currentDate = new Date();
const oneHour = new Date(currentDate);
oneHour.setHours(currentDate.getHours() - 1); // Corrected to get the past hour

const filter = {
  dateTime: {
    $lte: currentDate,
    $gte: oneHour,
  },
};

async function sendEmail() {
  try {
    console.log(filter);
    const appointments = await Appointment.find(filter).exec();
    console.log('Appointments within the last hour:', appointments);

    for (let i = 0; i < appointments.length; i++) {
      const appointment = appointments[i];
      const id = appointment.userId;
      const user = await User.findOne({_id: id});
      console.log(id);

      if (user) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: appointment.name,
            text: `Your appointment for ${appointment.name} is at ${appointment.dateTimetoLocaleString()}`,  
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


