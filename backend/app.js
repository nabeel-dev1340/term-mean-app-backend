const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors"); // import cors
const UserRouter = require("./routes/user"); //import User Routes
const DepartmentRouter = require("./routes/department");
const ComplaintRouter = require("./routes/complaint");

// Create Application Object
const app = express();
const port = 3000;

// GLOBAL MIDDLEWARE
app.use(express.json()); // parse json bodies
app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging

//Adding Routes
app.use("/api/user", UserRouter); // send all "/user" requests to UserRouter for routing
app.use("/api/department", DepartmentRouter);
app.use("/api/complaint", ComplaintRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Node Server is Up and Running ...");
});

// APP LISTENER
app.listen(port, () => {
  console.log("server started at port: " + port);
});
