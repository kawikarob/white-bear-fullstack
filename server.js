const express = require("express");
const app = express();
const mysql = require("mysql");
// var cors = require("cors");

// app.use(cors());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3020;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
