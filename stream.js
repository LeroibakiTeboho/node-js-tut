const fs = require("fs");

// Create a read stream to read the original data from a file
const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });

// Create a write stream to write the transformed data to a new file
const ws = fs.createWriteStream("./files/new-lorem.txt");

// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });


rs.pipe(ws); // Pipe the read stream to the write stream