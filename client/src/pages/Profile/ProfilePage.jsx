import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loading from "../../components/Loading";


const ProfilePage = () => {
    const [medicalData, setMedicalData] = useState(undefined);
    const [homeDoctor, setHomeDoctor] = useState(undefined);

    useEffect(() => {
        getMedicalData();
    }, []);

    useEffect(() => {
        getHomeDoctor();
    }, [medicalData]);
    

    const getMedicalData = async () => {
        let config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          };

        await axios.get(`http://localhost:3001/api/patients?self=true`, config)
        .then((response) => {
            console.log(response);
            if (response.data === null) setMedicalData(null);
            else setMedicalData(response.data.MedicalData)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getHomeDoctor = async () => {
        if (medicalData === undefined) return; // medicalData hasn't been fetched.
        if (medicalData === null) return; // medicalData fetched, but none found.

        let config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };

        await axios.get(`http://localhost:3001/api/patients/${medicalData.patientCpr}`, config)
        .then((response) => {
            console.log(response);
            setHomeDoctor(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    return (<div className="bg-white">
        <h1 className="text-center text-2xl p-6">Your medical data</h1>
        {medicalData !== undefined ? 
            (medicalData !== null ? (<div>
                Medical data found
                <div className="px-12">
                    <div className="mb-4 text-xl">
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

        {localStorage.getItem("role") === "patient" ? "you are a patient" : "you are a doctor"}

        {homeDoctor ? (<div>
            {homeDoctor.firstName}
        </div>)
        : (<div>No home doctor</div>)}
    </div>)
}

export default ProfilePage;