import React from "react";
import "../styles/dashboard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateColorArray } from "../store/actions/template";
import { fetchDashboard } from "../store/actions/dashboard";

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);
  console.log(data, `ini data dashboard dari store`);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  useEffect(() => {
    dispatch(generateColorArray());
  }, []);

  return (
    <section id="content">
      <h1>Welcome, {localStorage.getItem("email")}!</h1>
      <hr />
      <div className="row">
        <div className="column">
          <div className="card">
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              alt="logo"
            />
            <h2>Project Title</h2>
            <button>View</button>
            <button>Update</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              alt="logo"
            />
            <h2>Project Title</h2>
            <button>View</button>
            <button>Update</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              alt="logo"
            />
            <h2>Project Title</h2>
            <button>View</button>
            <button>Update</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
