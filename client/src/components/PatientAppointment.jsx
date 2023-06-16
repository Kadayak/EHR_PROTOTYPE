


const PatientAppointment = ({app}) => {

    return (
        <div id={app.id} className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)">
            <h1 className="pb-1 font-bold border-b-2 mb-2">{app.description}</h1>
            <h1>{new Date(app.time).toLocaleString()}</h1>
            <div className="py-2 text-center">
                <h1>Appointment status</h1>
                <h2>{app.pending ? (<div className="">Pending</div>) : (app.accepted ? (<div>Accepted</div>) : <div>Rejected</div>)}</h2>
            </div>
        </div>
    )
}


export default PatientAppointment;