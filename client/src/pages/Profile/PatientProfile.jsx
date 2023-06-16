import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useState, useEffect } from "react";
import axios from "axios";

import Loading from "../../components/Loading";
import PatientMedicalData from "./PatientMedicalData";
import PatientHomeDoctor from "./PatientHomeDoctor";
import PatientAppointments from "./PatientAppointments";


const PatientProfile = () => {
    const [ user, setUser ] = useContext(UserContext);
    
    const [medicalData, setMedicalData] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);
    const [homeDoctor, setHomeDoctor] = useState(undefined);

    const config = user ? {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
    }
    : null;


    useEffect(() => {
        getMedicalData();
    }, []);

    useEffect(() => {
        getUserInfo();
    }, [medicalData]);

    useEffect(() => {
        getHomeDoctor();
    }, [userInfo]);


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

    const getUserInfo = async () => {
        if (medicalData === undefined) return; // medicalData hasn't been fetched.
        if (medicalData === null) return; // medicalData fetched, but none found.

        await axios.get(`http://localhost:3001/api/patients/${medicalData.patientCpr}`, config)
        .then((response) => {
            setUserInfo(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getHomeDoctor = async () => {
        if (userInfo === undefined) return; // not yet fetched
        if (userInfo === null) return;  // fetched but not found... this should not happen tho.

        await axios.get(`http://localhost:3001/api/doctors/${userInfo.homeDoctorCpr}`, config)
        .then((response) => {
            setHomeDoctor(response.data)
        })
        .catch((error) => {
            console.log("success");
            console.log(error);
        });
    }


    return (
        <div>
            <h1 className="text-center text-2xl p-6">Your medical data</h1>
            {medicalData === undefined ? <Loading/>
            : (medicalData === null ? (<div className="pl-10 text-xl">No medical data found</div>)
                : (<>
                   <PatientMedicalData userInfo={userInfo} medicalData={medicalData}/>
                   <PatientHomeDoctor homeDoctor={homeDoctor}/>
                   <PatientAppointments/>
                </>)
            )
            }
        </div> 
    )
}

export default PatientProfile;

