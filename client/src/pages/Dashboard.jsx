import React from "react";
import "../styles/dashboard.css";
import DashboardCard from "../components/DashboardCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateColorArray } from "../store/actions/template";
import { fetchDashboard } from "../store/actions/dashboard";

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);

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
        {data && data.length
          ? data.map((singleData, index) => (
              <DashboardCard
                singleData={singleData}
                key={index}
              ></DashboardCard>
            ))
          : null}
      </div>
    </section>
  );
}

export default Dashboard;
