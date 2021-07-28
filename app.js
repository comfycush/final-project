if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
// const port = 3000
const cors = require("cors");
const UserController = require("./controllers/userController");
const TemplateController = require("./controllers/templateController");
const ChatController = require("./controllers/chatController");
const errHandler = require("./middlewares/errorHandler");
const { authentication, authorization } = require("./middlewares/auth");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/register", UserController.register); //
app.post("/login", UserController.login); //
app.post("/googleLogin", UserController.googleLogin);
app.post("/chat", ChatController.postChat);

app.get("/:templateId", TemplateController.getTemplateDeployedById); //
app.use(authentication);

app.get("/", TemplateController.getHome); //
app.get("/template/:templateId", TemplateController.getByTemplateId); //
app.post("/template", TemplateController.createTemplate); //

app.use("/template/:templateId", authorization);
app.patch("/template/:templateId", TemplateController.changeIsDeploy);
app.delete("/template/:templateId", TemplateController.deleteTemplate);
app.put("/template/:templateId", TemplateController.updateTemplate); //

app.use(errHandler);

module.exports = app;
