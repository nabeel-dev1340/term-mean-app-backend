const mongoose = require("mongoose"); //import fresh mongoose object
const { log } = require("mercedlogger"); // import merced logger

// CONNECT TO MONGODB
mongoose.connect = mongoose.connect(
  "mongodb+srv://root:root@cluster0.ebbkv1z.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// CONNECTION EVENTS
mongoose.connection
  .on("open", () => log.green("DATABASE STATE", "Connection Open"))
  .on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
  .on("error", (error) => log.red("DATABASE STATE", error));

// EXPORT CONNECTION
module.exports = mongoose;
