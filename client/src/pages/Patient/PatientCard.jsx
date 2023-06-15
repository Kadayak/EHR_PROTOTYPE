import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Loading from "../../components/Loading"

const PatientCard = () => {
  const [user, setUser] = useContext(UserContext);
  const [patients, setPatients] = React.useState(undefined);

  React.useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user ? user.accessToken : null}`,
        },
      };

      const response = await axios.get("http://localhost:3001/api/patients", config);
      console.log("SUCCESS");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      setPatients(null);
    }
  };

  return (
    <React.Fragment>
      <div className="grid-cols-4 gap-3 py-4">
        <div className="text-center text-2xl mb-8 font-medium">Your Patients</div>
        {!user ?  "You are logged out" :
        (patients ? patients.map( (patient) => 
          (<div id={patient.id} className="text-left block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <img
              className="object-cover object-center w-full h-56 mb-6 rounded-lg"
              src="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg"
              alt="avatar"
            />
            <p className="text-lg text-slate-50">
            {`${patient.firstName} ${patient.lastName}`}
            </p>
            <p className="text-lg text-slate-50">
              {`Birthdate ${new Date(patient.birthDate).toLocaleDateString()}`}
              </p>
          </div> ))
        :  (patients === null ?
          "No patients could be fetched"
          : <Loading/>))}
      </div>
    </React.Fragment>
  );
};

export default PatientCard;
