import React from "react";
import "../styles/dashboard.css";
import DashboardCard from "../components/DashboardCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateColorArray } from "../store/actions/template";
import { fetchDashboard } from "../store/actions/dashboard";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);
  const history = useHistory();

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
      {data.length === 0 ? (
        <div className="empty-dashboard">
          <img
            src="https://image.flaticon.com/icons/png/512/1055/1055685.png"
            alt="website"
          />
          <h1>Time To Build Your Website!</h1>
          <button
            className="btn btn-next"
            onClick={() => history.push("/intro-section")}
          >
            Create Website
          </button>
        </div>
      ) : (
        <>
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "3rem",
              fontWeight: "bolder",
              marginBottom: "1.5rem",
              color: "#125D98",
              marginTop: "2rem",
            }}
          >
            List Of Your Websites
          </h2>
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
        </>
      )}
    </section>
  );
}

export default Dashboard;
