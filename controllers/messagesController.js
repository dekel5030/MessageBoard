const messageDatabase = require("../database.js");

async function getAllMessages(req, res) {
  res.render("./pages/messages.ejs", {
    messages: await messageDatabase.getAllMessages(),
  });
}

async function getMessage(req, res) {
  const id = Number(req.params.id);
  const message = await messageDatabase.getMessageById(id);

  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }

  res.json(message);
}

async function addMessage(req, res) {
  const { author, message } = req.body;

  if (!author || !message) {
    return res.status(400).send("Author and message are required");
  }

  const newMessage = await messageDatabase.addMessage(author, message);

  res.redirect("/messages");
}

module.exports = {
  getAllMessages,
  getMessage,
  addMessage,
};
