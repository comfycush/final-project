import { getTemplateId } from "../store/actions/template";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarTemplate from "../components/NavbarTemplate";
import MainTemplate from "../components/MainTemplate";

export default function RenderFinish() {
  const id = 1;
  const dispatch = useDispatch();
  const templateData = useSelector((state) => state.template.data);

  useEffect(() => {
    dispatch(getTemplateId(id));
  }, [dispatch]);

  return (
    <div className="render-template">
      {/* <p>{JSON.stringify(templateData.navbar)}</p> */}
      {templateData.navbar && (
        <NavbarTemplate navbarData={templateData.navbar}></NavbarTemplate>
      )}
      {templateData.main && (
        <MainTemplate mainData={templateData.main}></MainTemplate>
      )}
    </div>
  );
}
