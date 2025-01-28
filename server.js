const express = require("express");
const app = express();
const path = require("path");

// Define the port number for the server
const PORT = process.env.PORT || 3500;

// Serve static files from the "public" directory
app.get("^/$|/index(.html)?", (req, res) => {
  // Serve the index.html file from the "views" directory
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Additional routes can be added here...
app.get("/new-page(.html)?", (req, res) => {
  // Serve the new-page.html file from the "views" directory
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  // Serve the new-page.html file from the "views" directory
  res.redirect(301, "/new-page.html");
});

// Route handler
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// chaining route handlers

const one = (req, res, next) => {
  console.log('one');
  next();
}

const two = (req, res, next) => {
  console.log('two');
  next();
}

const three = (req, res) => {
  console.log('three');
  res.send('finished!');
}

app.get('/chain(.html)?', [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
