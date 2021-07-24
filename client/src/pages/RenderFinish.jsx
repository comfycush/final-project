import { getTemplateId } from "../store/actions/template";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarTemplate from "../components/NavbarTemplate";
import MainTemplate from "../components/MainTemplate";
import AboutTemplate from "../components/AboutTemplate";
import ServiceTemplate from "../components/ServiceTemplate";
import ContactTemplate from "../components/ContactTemplate";
import FooterTemplate from "../components/FooterTemplate";
import ButtonTemplate from "../components/ButtonTemplate";

export default function RenderFinish() {
  const state = useSelector((state) => state.forms);
  console.log(state);
  const id = 1;
  const dispatch = useDispatch();
  const templateData = useSelector((state) => state.template.data);
  const templateIsLoading = useSelector((state) => state.template.isLoading);
  const templateIsError = useSelector((state) => state.template.isError);
  const isDeploy = useSelector((state) => state.template.isDeploy);

  useEffect(() => {
    dispatch(getTemplateId(id));
  }, [dispatch]);

  if (templateIsLoading) {
    return (
      <div className="loading-render">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (templateIsError) {
    return (
      <div className="error-render">
        <h1>Error Has Occured</h1>
      </div>
    );
  }

  return (
    <div className="render-template">
      {templateData.navbar && (
        <NavbarTemplate navbarData={templateData.navbar}></NavbarTemplate>
      )}
      {templateData.main && (
        <MainTemplate mainData={templateData.main}></MainTemplate>
      )}
      {templateData.about && (
        <AboutTemplate aboutData={templateData.about}></AboutTemplate>
      )}
      {templateData.service && (
        <ServiceTemplate serviceData={templateData.service}></ServiceTemplate>
      )}
      {templateData.contact && (
        <ContactTemplate contactData={templateData.contact}></ContactTemplate>
      )}
      {templateData.footer && (
        <FooterTemplate
          footerData={templateData.footer}
          navbarData={templateData.navbar}
        ></FooterTemplate>
      )}
      {!isDeploy && <ButtonTemplate></ButtonTemplate>}
    </div>
  );
}
