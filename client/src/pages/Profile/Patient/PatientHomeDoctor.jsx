


const PatientHomeDoctor = ({homeDoctor}) => {


    return (              <div className="">
    {homeDoctor ? (<div className="border-2 w-80 m-8 p-4">
    <h1 className="text-xl">Your home doctor</h1>
    <h2>{`${homeDoctor.firstName} ${homeDoctor.lastName} - cpr: ${homeDoctor.cpr}`}</h2>
    <div className="flex justify-center">
        <button className="border-2 px-2 py-1 m-2 bg-sky-300">Book appointment</button>
    </div>
</div>)
: (<div>No home doctor</div>)}
</div>)
}

export default PatientHomeDoctor;