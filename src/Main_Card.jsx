import React from "react";

const Main_Card = (props) => {
    console.log(props);
    const{firstName, lastName, age, email, photo} = props;
    return(
        <React.Fragment>        
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <img class="object-cover object-center w-full h-56 mb-6 rounded-lg" src={photo} alt="avatar" />
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{firstName} {lastName}</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">Age: {age}</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">Email: {email}</p>
            </a>
        </React.Fragment>
    )
    
};

export default Main_Card;