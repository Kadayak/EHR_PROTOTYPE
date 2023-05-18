import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const ProfilePage = () => {
    const [medicalData, setMedicalData] = useState();

    useEffect(() => {
        getMedicalData();
    }, []);

    const getMedicalData = async () => {

        let config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          };

        await axios.get(`http://localhost:3001/api/patients?self=true`, config)
        .then((response) => {
            setMedicalData(response.data.MedicalData)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    

    return (<div>
        {medicalData ? (<div>
            <h1 className="text-center text-2xl p-6">Your medical data</h1>
            <h2>{`Cpr: ${medicalData.id}`}</h2>
            <h2>Allergies</h2>
            <p>{"none"}</p>
        </div>)
        : (<div>"...Loading"</div>)}
    </div>)
}

export default ProfilePage;