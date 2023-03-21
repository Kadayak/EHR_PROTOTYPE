import React from "react";

const PatientCard = (props) => {
    const{firstName, lastName, email, photo, appointment} = props;
    const [clicked, setClicked] = React.useState(false);

    function handleClick(){
        setClicked(true)
    }

    return(
        <React.Fragment>        
            {clicked && <a href="#" class="text-left block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <img class="object-cover object-center w-full h-56 mb-6 rounded-lg" src={photo} alt="avatar" />
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{firstName} {lastName}</h5>
                {/*<p class="text-xl font-normal text-gray-700 dark:text-gray-400">Age: {age}</p>*/}
                <p class="text-2xl font-normal text-gray-700 dark:text-gray-400">Email: {email}</p>
                <p class="text-2xl font-normal text-gray-700 dark:text-gray-400">Appointment: {appointment}</p>
            </a>}
        </React.Fragment>
    )
    
};

export default PatientCard;