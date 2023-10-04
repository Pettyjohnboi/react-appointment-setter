import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENTS } from "../utils/queries";

function Appointments() {

    const { data } = useQuery(
        GET_ALL_APPOINTMENTS, 
        {     variables: 
            {       
                userId: Auth.getProfile().data._id,     
            },   
        });
    console.log(data.allAppointments);
    return (
        <div class="container p-5"> 
        
        </div>
    );
}

export default Appointments;