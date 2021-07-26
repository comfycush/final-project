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
    dispatch(generateColorArray());
    dispatch(fetchDashboard());
  }, []);

  // useEffect(() => {
  //   dispatch(generateColorArray());
  // }, []);

  return (
    <section id="content">
      <h1>
        Welcome,&nbsp;
        <span className="user-email">{localStorage.getItem("email")}</span>!
      </h1>
      <hr
        style={{ height: "0.2rem", backgroundColor: "#125D98", border: "none" }}
      />
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "3rem",
          marginBottom: "1.5rem",
          color: "#125D98",
          marginTop: "2rem",
        }}
      >
        List Of Your Websites
      </h2>
      {/* <hr /> */}
      <div className="row">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {data && data.length
            ? data.map((singleData, index) => (
                <DashboardCard
                  singleData={singleData}
                  key={index}
                ></DashboardCard>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
