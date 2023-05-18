import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PatientCard = (props) => {
  const { id, firstName, lastName, email, photo, appointment } = props;
  const [clicked, setClicked] = React.useState(true);
  const [patients, setPatients] = React.useState(null);
  const location = useLocation();


  React.useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {

    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }

    await axios.get("http://localhost:3001/api/patients", config)
    .then((response) => {
      console.log("SUCCESS");
      setPatients(response.data);
    }).catch((error) => {
      console.log("ERROR");
      alert("error retreiving patients");
    })
  }

  return (
    <React.Fragment>
      <div className="grid-cols-4 gap-3 py-4">
        <div className="text-center text-2xl mb-8 font-medium">Your Patients</div>
        {patients ? patients.map( (patient) => 
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
        : "Loading..."}
      </div>
    </React.Fragment>
  );
};

export default PatientCard;
