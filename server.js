const express = require("express");
const app = express();
const path = require("path");
// const mysql = require("mysql");
// var cors = require("cors");

app.use(express.json());
// app.use(cors());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
