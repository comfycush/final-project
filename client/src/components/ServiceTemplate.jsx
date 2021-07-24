import "../styles/service.css";
import CardService from "./CardService";
// import { useSelector } from "react-redux";

export default function ServiceTemplate({ serviceData, isDeploy }) {
  // const isDeploy = useSelector((state) => state.template.isDeploy);

  if (!serviceData.type) {
    return null;
  }

  return (
    <div className="section-and-update">
      <div
        id="Service"
        className={
          serviceData.type === 1
            ? "type-1-service"
            : serviceData.type === 2
            ? "type-2-service"
            : "type-3-service"
        }
        style={{
          backgroundColor: serviceData.backgroundColor,
          width: "100%",
          flexShrink: 0,
        }}
      >
        <h1
          className="service-headline"
          style={{ color: serviceData.headlineColor }}
        >
          {serviceData.headline}
        </h1>
        <div className="service-card-section">
          {(serviceData.cardImage1 ||
            serviceData.cardTitle1 ||
            serviceData.cardText1) && (
            <CardService
              type={serviceData.type}
              bgCol={serviceData.cardBackgroundColor1}
              image={serviceData.cardImage1}
              title={serviceData.cardTitle1}
              titleCol={serviceData.cardTitleColor1}
              text={serviceData.cardText1}
              textCol={serviceData.cardTextColor1}
            ></CardService>
          )}
          {(serviceData.cardImage2 ||
            serviceData.cardTitle2 ||
            serviceData.cardText2) && (
            <CardService
              type={serviceData.type}
              bgCol={serviceData.cardBackgroundColor2}
              image={serviceData.cardImage2}
              title={serviceData.cardTitle2}
              titleCol={serviceData.cardTitleColor2}
              text={serviceData.cardText2}
              textCol={serviceData.cardTextColor2}
            ></CardService>
          )}
          {(serviceData.cardImage3 ||
            serviceData.cardTitle3 ||
            serviceData.cardText3) && (
            <CardService
              type={serviceData.type}
              bgCol={serviceData.cardBackgroundColor3}
              image={serviceData.cardImage3}
              title={serviceData.cardTitle3}
              titleCol={serviceData.cardTitleColor3}
              text={serviceData.cardText3}
              textCol={serviceData.cardTextColor3}
            ></CardService>
          )}
        </div>
      </div>
      {!isDeploy && (
        <div className="update-service-section">
          <button className="btn btn-update-section">Update Service</button>
        </div>
      )}
    </div>
  );
}
