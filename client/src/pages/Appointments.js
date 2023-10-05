import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENTS } from "../utils/queries";

function Appointments() {
    const userId = Auth.getProfile().data._id;
    const { data } = useQuery(
        GET_ALL_APPOINTMENTS, 
        {     variables: 
            {       
                userId: userId,     
            },   
        });

    const columnsPerRow = 3;
    const appointments = [];
    if(data != undefined){
        const arr = data.allAppointments;
        console.log(data.allAppointments);
        arr.forEach((appointment, index) => {
            var timestamp = Number(appointment.dateTime);
            var date = new Date(timestamp);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; // Months are zero-based, so adding 1
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var formattedDate = year + '-'
                                + month + '-'
                                + day + ' '
                                + hours + ':'
                                + minutes + ':'
                                + seconds;
            appointments.push(
                <div class="col p-5 text-center">
                    <div key={index}>
                        <h4>Name: {appointment.name}</h4>
                        <h4>Address: {appointment.address}</h4>
                        <h4>Phone Number: {appointment.phone}</h4>
                        <h4>Email: {appointment.email}</h4>
                        <h4>Date: {formattedDate}</h4>
                    </div>
                </div>
            );
            if(columnsPerRow % index  == 0){
                appointments.push(<div></div>);
            } 
        });
    }
    return (
        <div class="row p-5">
            {appointments}
        </div>
    );
}

export default Appointments;