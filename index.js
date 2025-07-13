const express = require("express");
const messagesRouter = require("./routes/messagesRouter.js");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/messages", messagesRouter);
app.get("/", (req, res) => res.render("./pages/home"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`The app is running on port: ${PORT}`));
