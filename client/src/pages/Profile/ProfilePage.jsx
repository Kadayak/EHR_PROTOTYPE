import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loading from "../../components/Loading";


const ProfilePage = () => {
    const [medicalData, setMedicalData] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [homeDoctor, setHomeDoctor] = useState(undefined);

    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };

    useEffect(() => {
        getMedicalData();
    }, []);

    useEffect(() => {
        getUser();
    }, [medicalData]);

    useEffect(() => {
        getHomeDoctor();
    }, [user]);
    

    const getMedicalData = async () => {
        await axios.get(`http://localhost:3001/api/patients?self=true`, config)
        .then((response) => {
            if (response.data === null) setMedicalData(null);
            else setMedicalData(response.data.MedicalData)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getUser = async () => {
        if (medicalData === undefined) return; // medicalData hasn't been fetched.
        if (medicalData === null) return; // medicalData fetched, but none found.

        await axios.get(`http://localhost:3001/api/patients/${medicalData.patientCpr}`, config)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getHomeDoctor = async () => {
        if (user === undefined) return; // not yet fetched
        if (user === null) return;  // fetched but not found... this should not happen tho.

        await axios.get(`http://localhost:3001/api/doctors/${user.homeDoctorCpr}`, config)
        .then((response) => {
            console.log("success");
            console.log(response);
            setHomeDoctor(response.data)
        })
        .catch((error) => {
            console.log("success");
            console.log(error);
        });
    }


    return (<div className="bg-white">
        <h1 className="text-center text-2xl p-6">Your medical data</h1>
        {medicalData !== undefined ? 
            (medicalData !== null ? (<div>
                <div className="px-12">
                    <div className="mb-4 text-xl">
                        {user && (<h1 className=" text-2xl">{`${user.firstName} ${user.lastName}`}</h1>)}
                        <h2>{`Cpr: ${medicalData.patientCpr}`}</h2>
                    </div>
                    <div className="mb-4">
                        <h2>Allergies</h2>
                        <p>{medicalData.allergies}</p>
                    </div>
                    <div className="mb-4">
                        <h2>Blood Status</h2>
                        <p>{medicalData.bloodStatus}</p>
                    </div>
                    <div className="mb-4">
                        <h2>Vaccinations</h2>
                        <p>{medicalData.vaccinations}</p>
                    </div>
                </div>
            </div>) : (<div className="pl-10 text-xl">No medical data found</div>))
        : (<Loading/>)}

        {localStorage.getItem("role") === "patient" ? "(you are a patient)" : "(you are a doctor)"}

        {homeDoctor ? (<div className="border-2 w-80 m-8 p-4">
            <h1 className="text-xl">Your home doctor</h1>
            <h2>{`${homeDoctor.firstName} ${homeDoctor.lastName} - cpr: ${homeDoctor.cpr}`}</h2>
            <div className="flex justify-center">
                <button className="border-2 px-2 py-1 m-2 bg-sky-300">Book appointment</button>
            </div>
        </div>)
        : (<div>No home doctor</div>)}
    </div>)
}

export default ProfilePage;