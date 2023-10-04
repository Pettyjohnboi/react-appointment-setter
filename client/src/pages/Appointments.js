import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENTS } from "../utils/queries";

function Appointments() {

    const getAllAppointments = useQuery(GET_ALL_APPOINTMENTS);
    console.log(getAllAppointments);

    //let appArr = getAllAppointments.data.allAppointments;

    return (
        <div class="container p-5"> 

        </div>
    );
}

export default Appointments;