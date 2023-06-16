import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import PatientProfile from "./Patient/PatientProfile";
import DoctorProfile from "./Doctor/DoctorProfile";


const ProfilePage = () => {
    const [ user, setUser ] = useContext(UserContext);


    
    return (
    <div className="p-10">
        {!user 
        ? (<div>You are not logged in</div>)
        : (user.role === "doctor" 
            ? (<DoctorProfile/>)
            : (user.role === "patient" 
                ? (<PatientProfile/>)
                : <div>unknown</div>
            )
        )
        }
        </div>
        )
};

export default ProfilePage;