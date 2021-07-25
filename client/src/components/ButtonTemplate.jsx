import "../styles/buttonTemplate.css";
import { useHistory } from "react-router";

export default function ButtonTemplate() {
  const history = useHistory();
  return (
    <div className="button-template-section">
      <button
        onClick={() => history.push("/dashboard")}
        className="btn btn-home"
      >
        Back To Home
      </button>
      <button className="btn btn-deploy">Deploy</button>
    </div>
  );
}
