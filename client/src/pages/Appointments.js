import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENTS } from "../utils/queries";
import { Delete_APPOINTMENT, UPDATE_APPOINTMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";

function Appointments() {

    const [showDiv, setShowDiv] = useState(false);
    const [setAppt, setApptIndex] = useState(0);
    const [delAppt] = useMutation(Delete_APPOINTMENT);
    const [updateAppt] = useMutation(UPDATE_APPOINTMENT);
    const userId = Auth.getProfile().data._id;
    const { data } = useQuery(
        GET_ALL_APPOINTMENTS, 
        {     variables: 
            {       
                userId: userId,     
            },   
        });
        
    const handleDeleteAppointment = (appointmentIdInput) => {
        try{ 
            const { data } = delAppt ({
                variables:
                {   
                    deleteAppointmentInput: 
                    {
                        _id: appointmentIdInput
                    }
                }
                
            });
            window.location.reload(false);
        } catch (err) {
            console.error(err);
        }
    };


    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const handleUpdateAppointment = async (appointmentIdInput) => {

        try {
            // Assuming updateAppt is a GraphQL mutation
            const { data } = await updateAppt({
                variables: {
                    appointmentId: appointmentIdInput,
                    updateAppointmentInput: {
                        name:name,
                        address:address,
                        phone:phone,
                        email:email,
                        description:description,
                        dateTime:"2023-12-31T14:30:00Z",
                    },
                },
            });
            console.log('Mutation response: ', data);
            //window.location.reload(false);
        } catch (err) {
            console.error('Mutation error:', err.message);
        }
    };

    const handleButtonClick = (index) => {
        setApptIndex(index);
        if(showDiv == false){
            setShowDiv(true);
        } else {
            setShowDiv(false); 
        }
    };

    const columnsPerRow = 3;
    const appointments = [];
    if(data != undefined){
        const arr = data.allAppointments;
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
                <div class="col p-4">
                    <div key={index} style={{margin: 'auto', width: '70%'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ marginRight: 'auto' }}>Name:</h4>
                            <h4 style={{ marginLeft: 'auto' }}>{appointment.name}</h4>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ marginRight: 'auto' }}>Address:</h4>
                            <h4 style={{ marginLeft: 'auto' }}>{appointment.address}</h4>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ marginRight: 'auto' }}>Email:</h4>
                                <h4 style={{ marginLeft: 'auto' }}>{appointment.email}</h4>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ marginRight: 'auto' }}>Phone:</h4>
                                <h4 style={{ marginLeft: 'auto' }}>{appointment.phone}</h4>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ marginRight: 'auto' }}>Description:</h4>
                                <h4 style={{ marginLeft: 'auto' }}>{appointment.description}</h4>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ marginRight: 'auto' }}>Date:</h4>
                                <h4 style={{ marginLeft: 'auto' }}>{formattedDate}</h4>
                        </div>
                        <button onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
                        <button onClick={() => handleButtonClick(index)}>Edit</button>
                        {(index === setAppt && showDiv) && (
                            <div class="p-1" style={{margin: 'auto', width: '75%'}}>
                            {/* Your content goes here */}
                                <Form onSubmit={() => handleUpdateAppointment(appointment._id)}>
                                    <Form.Group controlId="name">
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Control
                                            type="text"
                                            placeholder="Address"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="phone">
                                        <Form.Control
                                            type="tel"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Control
                                            type="text"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </Form.Group>
                                    <div class="pt-3">
                                        <Button variant="primary" type="submit">
                                            Update
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </div>
                </div>
            );
            if(columnsPerRow % index  == 0){
                appointments.push(<div class="col"></div>);
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