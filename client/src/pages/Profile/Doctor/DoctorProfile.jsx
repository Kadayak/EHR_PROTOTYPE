import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import Loading from "../../../components/Loading";

import axios from "axios";
import DoctorAppointment from "./DoctorAppointment";

const DoctorProfile = () => {
  const [user, setUser] = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState({});

  const config = user
    ? {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    : null;

  useEffect(() => {
    getDoctorInfo();
  }, []);

  useEffect(() => {
    getAppointments();
  }, []);

  const getDoctorInfo = async () => {
    await axios
      .get(`http://localhost:3001/api/doctors/${user.cpr}`, config)
      .then((response) => {
        if (response.data === null) setDoctor({});
        else setDoctor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAppointments = async () => {
    await axios
      .get(
        `http://localhost:3001/api/appointments/all/doctors/${user.cpr}`
        // config
      )
      .then((response) => {
        if (response.data === null) {
          setAppointments(null);
          console.log("help");
        } else {
          setAppointments(response.data);
          console.log("appointments: ", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="text-xl p-10">
        Welcome {doctor.firstName + " " + doctor.lastName}
      </div>
      <div>
        {appointments === undefined ? (
          <Loading />
        ) : appointments === null ? (
          <div>No appointments found</div>
        ) : (
          <div className="flex flex-col gap-6 px-10">
            <h1 className="text-xl">Your Appointments</h1>
            <div className="flex gap-6">
              {appointments.map((app) => {
                return (
                  <DoctorAppointment
                    app={app}
                    getAppointments={getAppointments}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorProfile;
