

const PatientMedicalData = ({userInfo, medicalData}) => {


    return (
        <div id="medical-data" className="px-12">
                    <div className="mb-4 text-xl">
                        {userInfo && (<h1 className=" text-2xl">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>)}
                        <h2>{`Cpr: ${medicalData.patientCpr}`}</h2>
                    </div>
                    <div className="mb-4">
                        <h2>Allergies</h2>
                        <p>{medicalData.allergies}</p>
                    </div>
                    <div className="mb-4">
                        <h2>Blood Status</h2>
                        <p>{medicalData.bloodStatus}</p>
                    </div>
                    <div className="mb-4">
                        <h2>Vaccinations</h2>
                        <p>{medicalData.vaccinations}</p>
                    </div>
                </div>
    )
}

export default PatientMedicalData;