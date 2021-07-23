import "../styles/contact.css";

export default function ContactTemplate({ contactData }) {
  return (
    <div
      id="Contact"
      className={
        contactData.type === 1
          ? "type-1-contact"
          : contactData.type === 2
          ? "type-2-contact"
          : "type-3-contact"
      }
      style={{ backgroundColor: contactData.backgroundColor }}
    >
      <h1 style={{ color: contactData.headlineColor }}>
        {contactData.headline}
      </h1>
      <div className="contact-inside">
        <div className="card-contact">
          <img src={contactData.emailIcon} alt="email" />
          <p style={{ color: contactData.emailColor }}>{contactData.email}</p>
        </div>
        <div className="card-contact">
          <img src={contactData.phoneIcon} alt="phone" />
          <p style={{ color: contactData.phoneColor }}>{contactData.phone}</p>
        </div>
        <div className="card-contact">
          <img src={contactData.addressIcon} alt="address" />
          <p style={{ color: contactData.addressColor }}>
            {contactData.address}
          </p>
        </div>
      </div>
    </div>
  );
}
