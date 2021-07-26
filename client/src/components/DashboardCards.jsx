import React from "react";
import { getTemplateId, getDeployTemplate } from "../store/actions/template";
import { deleteTemplate } from "../store/actions/forms";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function DashboardCard(props) {
  const data = props.singleData;
  const dispatch = useDispatch();
  const history = useHistory();

  function toView() {
    console.log(data, "<<<<<< data to view");
    if (data.isDeploy) {
      // dispatch(setTemplateId(data.id));
      dispatch(getDeployTemplate(data.id));
      history.push(`/deploy/${data.navbar.companyName}/${data.id}`);
    } else {
      // dispatch(setTemplateId(data.id));
      dispatch(getTemplateId(data.id));
      history.push(`/finish/${data.id}`);
    }
  }

  function toDelete() {
    dispatch(deleteTemplate(data.id));
    Swal.fire("Successfully Deleted The Website", "", "success");
  }

  function toUpdate() {
    history.push({
      pathname: "/update-template",
      state: {
        allData: data,
        section: "navbar",
      },
    });
  }

  return (
    <div className="column">
      <div className="card">
        {data.navbar.logo ? (
          <img src={data.navbar.logo} alt="logo" />
        ) : (
          <img
            src="https://ik.imagekit.io/vrvrzbdh5xfk/Default_Logo_ny7_mjnCM.png?updatedAt=1627280073186"
            alt="logo"
          />
        )}
        <h2>{data.projectTitle}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button onClick={toView} className="btn btn-view-card">
            View
          </button>
          <button onClick={toUpdate} className="btn btn-update-card">
            Update
          </button>
          <button onClick={toDelete} className="btn btn-delete-card">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
