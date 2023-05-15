import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PatientCard = (props) => {
    const{id, firstName, lastName, email, photo, appointment} = props;
    const [clicked, setClicked] = React.useState(true);
    const location = useLocation();

    const patients = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "jhond@outlook.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-05-01 10:00:00"
        },
        {
            id: 2,
            firstName: "Irma",
            lastName: "Sjöberg",
            email: "irma_sjoberg@gmail.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-04-03 12:00:00"
        },
        {
            id: 3,
            firstName: "Alexander",
            lastName: "Black",
            email: "alex_b@gmail.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-03-30 10:30:00"
        },
        {
            id: 4,
            firstName: "Laura",
            lastName: "Chang",
            email: "lchang2@gmail.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-04-15 13:00:00"
        },
        {
            id: 5,
            firstName: "John",
            lastName: "Doe",
            email: "jhond@outlook.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-05-01 10:00:00"
        },
        {
            id: 6,
            firstName: "Irma",
            lastName: "Sjöberg",
            email: "irma_sjoberg@gmail.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-04-03 12:00:00"
        },
        {
            id: 7,
            firstName: "Alexander",
            lastName: "Black",
            email: "alex_b@gmail.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-03-30 10:30:00"
        },
        {
            id: 8,
            firstName: "Laura",
            lastName: "Chang",
            email: "lchang2@gmail.com",
            photo: "https://freerangestock.com/sample/120140/business-man-profile-vector.jpg",
            appointment: "2023-04-15 13:00:00"
        }
    ];


    function getPatients(){
        let paciente = axios.get('http://localhost:3001/api/patients');
        console.log(paciente);
    };

    return(
        <React.Fragment>
            {/*{`${location.pathname}/${patient.id}`}*/ getPatients()}
            <div className="grid grid-cols-4 gap-3 py-4">
                {patients.map( (patient) => (clicked && 
                <a href={location.pathname === 'http://localhost:3000/patients/' ? location.pathname + patient.id : `http://localhost:3000/patients/${patient.id}`} class="text-left block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <img className="object-cover object-center w-full h-56 mb-6 rounded-lg" src={patient.photo} alt="avatar" />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{patient.firstName} {patient.lastName}</h5>
                    <p className="text-2xl font-normal text-gray-700 dark:text-gray-400">Email: {patient.email}</p>
                    <p className="text-2xl font-normal text-gray-700 dark:text-gray-400">Appointment: {patient.appointment}</p>
                </a>
                ))}
            </div>
        </React.Fragment>
    )
    
};

export default PatientCard;