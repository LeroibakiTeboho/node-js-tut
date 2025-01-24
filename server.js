// How NodeJs differ from Vanilla JS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) The console is the terminal window

console.log("Hello World");

// 3) global object instead of window object (Browser)

console.log(global);

// 4) Has built-in module (Common Core Modules) that we will explore

// 5) Has Common Core modules instead of ES6 modules

const os = require('os');
const path = require('path');
// const math = require('./math');
const {add, sub, div, mul} = require('./math'); // distructured import


console.log(os.type());
console.log(os.version());
console.log(os.homedir());


console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

console.log(add(5, 3));
console.log(sub(5, 3));
console.log(mul(5, 3));
console.log(div(5, 3));

// 6) Missing some Js Api like fetch 