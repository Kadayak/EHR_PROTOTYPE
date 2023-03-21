import React from "react";

const Employee = (props) => {
    console.log(props);
    const {firstName, lastName, age} = props;
    return (
        <React.Fragment>
            <div>
                <h6>Employee Name: {firstName} {lastName} || Age: {age}</h6>
            </div>
        </React.Fragment>
    )
};

export default Employee;