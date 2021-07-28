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
import { useLocation } from "react-router";
import { setIsFooterFinished } from "../store/actions/forms";
import { deleteTemplate, setIsDeploy } from "../store/actions/forms";
import { useParams } from "react-router";
import { setReplyChatbot } from "../store/actions/forms";

export default function RenderFinish({ setIsOpen }) {
  const state = useSelector((state) => state.forms);
  const location = useLocation();
  const { templateId } = useParams();
  const dispatch = useDispatch();
  const templateData = useSelector((state) => state.template.data);
  const templateIsLoading = useSelector((state) => state.template.isLoading);
  const templateIsError = useSelector((state) => state.template.isError);
  const isDeploy = useSelector((state) => state.forms.isDeploy);

  useEffect(() => {
    setIsOpen(false);
    dispatch(setReplyChatbot(""));
    dispatch(setIsFooterFinished(false));
    dispatch(getTemplateId(templateId));
    console.log(`masuk renderfinish`);
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
        <NavbarTemplate
          navbarData={templateData.navbar}
          isDeploy={isDeploy}
          templateData={templateData}
        ></NavbarTemplate>
      )}
      {templateData.main && (
        <MainTemplate
          mainData={templateData.main}
          isDeploy={isDeploy}
          templateData={templateData}
        ></MainTemplate>
      )}
      {templateData.about && (
        <AboutTemplate
          aboutData={templateData.about}
          isDeploy={isDeploy}
          templateData={templateData}
        ></AboutTemplate>
      )}
      {templateData.service && (
        <ServiceTemplate
          serviceData={templateData.service}
          isDeploy={isDeploy}
          templateData={templateData}
        ></ServiceTemplate>
      )}
      {templateData.contact && (
        <ContactTemplate
          contactData={templateData.contact}
          isDeploy={isDeploy}
          templateData={templateData}
        ></ContactTemplate>
      )}
      {templateData.footer && (
        <FooterTemplate
          footerData={templateData.footer}
          navbarData={templateData.navbar}
          isDeploy={isDeploy}
          templateData={templateData}
        ></FooterTemplate>
      )}
      {!isDeploy && (
        <ButtonTemplate templateData={templateData}></ButtonTemplate>
      )}
    </div>
  );
}
