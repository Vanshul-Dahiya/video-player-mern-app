const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnection } = require("./db/dbConnect");
const { readdirSync } = require("fs");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middleWares
app.use(cors());
app.use(express.json());

// routes
// readdirSync will read/access all the files in the route folder
readdirSync("./routes").map((route) => {
  app.use("/api", require("./routes/" + route));
});

// serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

const server = () => {
  dbConnection();
  app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
  });
};

server();
