import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import PatientProfile from "./PatientProfile";


const ProfilePage = () => {
    const [ user, setUser ] = useContext(UserContext);


    
    return (
    <div className="p-10">
        {!user 
        ? (<div>You are not logged in</div>)
        : (user.role === "doctor" 
            ? (<div>you are a doctor</div>)
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