const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

//* Define the port number for the server
const PORT = process.env.PORT || 3500;

//* custom middleware logger
app.use(logger);

//* Enable CORS (Cross-Origin Resource Sharing) for all requests
app.use(cors(corsOptions));

//* built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: true }));

//* built-in middleware to handle JSON data
app.use(express.json());

//* server static files from the "public" directory
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//* Define routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  //* Send a 404 response for all other requests
  res.status(404);

  // Send a custom 404 error message based on the requested format
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

//* Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
