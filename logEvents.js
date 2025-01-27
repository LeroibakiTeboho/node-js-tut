const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "dd|MM|yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  console.log(logItem);

  try {
    // Create a new directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }

    // Append the log item to the log file in the logs directory
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem + "\n"
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvents;

