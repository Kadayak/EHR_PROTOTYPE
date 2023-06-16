import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

const DoctorAppointment = ({ app, getAppointments }) => {
  const [user, setUser] = useContext(UserContext);

  const rejectAppointment = async () => {
    await axios
      .get(
        `http://localhost:3001/api/appointments/${app.id}/doctors/${user.cpr}?approve=false`
      )
      .then((response) => {
        console.log(response.data);
        getAppointments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptAppointment = async () => {
    await axios
      .get(
        `http://localhost:3001/api/appointments/${app.id}/doctors/${user.cpr}?approve=true`
      )
      .then((response) => {
        console.log(response.data);
        getAppointments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)">
      <h1 className="pb-1 font-bold border-b-2 mb-2">{app.description}</h1>
      <h1>{new Date(app.time).toLocaleString()}</h1>
      <div className="py-2 text-center">
        <h1>Appointment status</h1>
        <h2>
          {app.pending ? (
            <div className="">Pending</div>
          ) : app.accepted ? (
            <div>Accepted</div>
          ) : (
            <div>Rejected</div>
          )}
        </h2>
      </div>
      <div className="flex justify-between">
        <button
          className="text-green-500 bg-green-300 p-2"
          onClick={acceptAppointment}
        >
          Approve
        </button>
        <button
          className="text-red-500 bg-red-300 p-2"
          onClick={rejectAppointment}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default DoctorAppointment;
