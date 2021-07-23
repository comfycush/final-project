import "../styles/contact.css";
import { useSelector } from "react-redux";

export default function ContactTemplate({ contactData }) {
  const isDeploy = useSelector((state) => state.template.isDeploy);

  if (!contactData.type) {
    return null;
  }
  return (
    <div className="section-and-update">
      <div
        id="Contact"
        className={
          contactData.type === 1
            ? "type-1-contact"
            : contactData.type === 2
            ? "type-2-contact"
            : "type-3-contact"
        }
        style={{
          backgroundColor: contactData.backgroundColor,
          width: "100%",
          flexShrink: 0,
        }}
      >
        <h1 style={{ color: contactData.headlineColor }}>
          {contactData.headline}
        </h1>
        <div className="contact-inside">
          {contactData.email && (
            <div className="card-contact">
              <img src={contactData.emailIcon} alt="email" />
              <p style={{ color: contactData.emailColor }}>
                {contactData.email}
              </p>
            </div>
          )}
          {contactData.phone && (
            <div className="card-contact">
              <img src={contactData.phoneIcon} alt="phone" />
              <p style={{ color: contactData.phoneColor }}>
                {contactData.phone}
              </p>
            </div>
          )}
          {contactData.address && (
            <div className="card-contact">
              <img src={contactData.addressIcon} alt="address" />
              <p style={{ color: contactData.addressColor }}>
                {contactData.address}
              </p>
            </div>
          )}
        </div>
      </div>
      {!isDeploy && (
        <div className="update-contact-section">
          <button className="btn btn-update-section">Update Contact</button>
        </div>
      )}
    </div>
  );
}
