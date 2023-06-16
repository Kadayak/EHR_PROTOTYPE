import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

import Loading from "../../../components/Loading";
import PatientAppointment from "../../../components/PatientAppointment";


const PatientAppointments = () => {
    const [user, setUser] = useContext(UserContext);
    const [appointments, setAppointments] = useState(undefined);

    
    console.log(user);

    useEffect(() => {
        fetchPatientAppointments();
    }, []);

    const fetchPatientAppointments = async () => {
        await axios.get(`http://localhost:3001/api/appointments/all/patients/${user.cpr}`)
        .then((response) => {
            setAppointments(response.data);
        })
        .catch((error) => {
            setAppointments(null);
            console.error(error);
        });
    }


    return (
        <div>
            {appointments === undefined ? <Loading/>
            : (appointments === null 
                ? (<div>No appointments found</div>)
                : (
                    <div className="flex flex-col gap-6 px-10">
                        <h1 className="text-xl">Your Appointments</h1>
                        <div className="flex gap-6">

                    {appointments.map((app) => {
                        return <PatientAppointment app={app}/>
                    })}
                    </div>
                    </div>
                )) }
        </div>
    );
};

export default PatientAppointments;