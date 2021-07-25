import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../store/actions/dashboard";
import "../styles/dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Dashboard);
  console.log(data);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  return (
    <section id="content">
      <h1>Welcome, User!</h1>
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
