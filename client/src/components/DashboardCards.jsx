import React from "react";

function DashboardCard(props) {
  const data = props.singleData;

  return (
    <div className="column">
      <div className="card">
        <img src={data.navbar.logo} alt="logo" />
        <h2>{data.projectTitle}</h2>
        <button>View</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default DashboardCard;
