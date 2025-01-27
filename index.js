const logEvents = require("./logEvents");

const EventEmitter = require("events");

// Create an instance of the EventEmitter class
class myEmitterClass extends EventEmitter {}

// initiate an object
const myEmitter = new myEmitterClass();

// Register a listener for the "log" event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // Emit the "log" event after 2 seconds to demonstrate the listener function
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
