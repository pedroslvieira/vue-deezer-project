import express from "express";
import process from "process";
import path from "path";
const port = process.env.PORT || 8080;

const __dirname = path.dirname;

const app = express();

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("Server started...");
