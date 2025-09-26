const fs = require("fs");
const os = require("os");

const EventEmitter = require("events");

class Logger extends EventEmitter {
	log(msg) {
		this.emit("message", { msg });
	}
}

const logger = new Logger();
const logFile = "./logFile.txt";

const logToFile = (e) => {
	const eventMsg = `${new Date().toISOString()} - ${e.msg}\n`;
	fs.appendFileSync(logFile, eventMsg);
};

logger.on("message", logToFile);

setInterval(() => {
	const memoryUsage = (os.freemem() / os.totalmem) * 100;
	logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`);
}, 3000);

logger.log("Application started");
logger.log("Application event occurred");
