const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    // Reading a file and handling potential errors
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );

    // Deleting a file and handling potential errors
    // await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    // console.log(data);

    // Writing to a file and handling potential errors
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );

    // Appending to a file and handling potential errors
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you"
    );

    // Renaming a file and handling potential errors
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );

    // Reading a file and handling potential errors
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );

    console.log(newData);
  } catch (error) {}
};

fileOps();

// Reading a file and handling potential errors
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

console.log("Hello.....");

// Writing to a file and handling potential errors
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete!");

//     // Appending to a file and handling potential errors
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nYes it is",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete!");
//       }
//     );

//     // Rename a file and handling potential errors
//     fs.rename(
//       path.join(__dirname, "files", "reply.txt"),
//       path.join(__dirname, "files", "newReply.txt"),
//       (err) => {
//         if (err) throw err;
//         console.log("Rename complete!");
//       }
//     );
//   }
// );

// Handling unhandled rejections
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  // Exit the process with a non-zero status code
  process.exit(1);
});
