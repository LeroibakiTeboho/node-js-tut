const fs = require("fs");

// Check if the "new_folder" directory exists
if (!fs.existsSync("./new_folder")) {
  // Create a new directory named "new_folder"
  fs.mkdir("./new_folder", (err) => {
    if (err) throw err;

    console.log("Directory created!");
  });
} else {
  console.log("dir exists");
}

// Remove the "new_folder" directory if it exists
if (fs.existsSync("./new_folder")) {
  // Remove the directory recursively (including all files and subdirectories)
  fs.rmdir("./new_folder", (err) => {
    if (err) throw err;

    console.log("Directory removed!");
  });
} else {
  console.log("dir does not exist");
}
