import express from "express";
import process from "process";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
  console.log(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("Server started...");
