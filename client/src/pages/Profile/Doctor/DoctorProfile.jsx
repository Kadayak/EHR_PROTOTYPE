import { useContext } from "react";

import { UserContext } from "../../../context/UserContext";

const DoctorProfile = () => {
    const [ user, setUser ] = useContext(UserContext);


    return (<div>You are a doctor...
        {user.role}
    </div>)
}


export default DoctorProfile;
