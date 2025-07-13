const { Router, urlencoded } = require("express");
const messagesController = require("../controllers/messagesController.js");

const messageRouter = Router();
messageRouter.use(urlencoded({ extended: true }));

messageRouter.get("/:id", messagesController.getMessage);

messageRouter.get("/", messagesController.getAllMessages);

messageRouter.post("/", messagesController.addMessage);

module.exports = messageRouter;
