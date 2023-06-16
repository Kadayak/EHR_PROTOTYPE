import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Loading from "../../components/Loading";


const PatientAppointments = () => {
    const [user, setUser] = useContext(UserContext);
    const [appointments, setAppointments] = useState(undefined);

    
    console.log(user);

    useEffect(() => {
        fetchPatientAppointments();
    }, []);

    const fetchPatientAppointments = async () => {
        await axios.get(`http://localhost:3001/api/appointments/*/patients/${user.cpr}`)
        .then((response) => {
            setAppointments(response.data);
            console.log(response.data);
            // setTimeout(function() {
            //     console.log(response.data);
            //   }, 1000);
        })
        .catch((error) => {
            setAppointments(null);
            console.log(error);
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
                        return <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)">
                            <h1 className="pb-1 font-bold border-b-2 mb-2">{app.description}</h1>
                            <h1>{new Date(app.time).toLocaleString()}</h1>
                            <div className="py-2 text-center">
                                <h1>Appointment status</h1>
                                <h2>{app.pending ? (<div className="">Pending</div>) : (app.accepted ? (<div>Accepted</div>) : <div>Rejected</div>)}</h2>
                            </div>
                            </div>
                    })}
                    </div>
                    </div>
                )) }
        </div>
    );
};

export default PatientAppointments;