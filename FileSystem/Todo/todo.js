const fs = require("fs");
const filePath = "./tasks.json";

//process = [node, filepath, command(add, list, remove), arguments]
const command = process.argv[2];
const arg = process.argv[3];

const loadTasks = () => {
	try {
		// reading the file syncronously and returning the existing tasks
		const bufferData = fs.readFileSync(filePath);
		const dataJSON = bufferData.toString();
		return JSON.parse(dataJSON);
	} catch (error) {
		// no existing task, return empty array
		return [];
	}
};

const listTasks = () => {
	// obtaining the existing tasks
	const tasks = loadTasks();

	if (tasks.length) {
		// displaying the tasks on console
		// index 0 will be displayed as 1
		tasks.forEach((task, index) => console.log(`${index + 1} - ${task}`));
	} else {
		console.log("no task exists!");
	}
};

const saveTasks = (tasks) => {
	const dataJSON = JSON.stringify(tasks);
	//saving the tasks by writting the updated tasks
	//inside filepath
	fs.writeFileSync(filePath, dataJSON);
	listTasks();
};

const addTasks = (task) => {
	//first check if there are existing tasks and load them if they do
	const tasks = loadTasks();
	console.log(task);
	tasks.push(task);
	saveTasks(tasks);
};

const deleteTasks = (index) => {
	// obtaining the existing tasks
	const tasks = loadTasks();

	// deleting the task corrosponding to thedel
	// provided index
	tasks.splice(index - 1, 1);
	saveTasks(tasks);
};

if (command === "add") {
	addTasks(arg);
} else if (command === "delete") {
	deleteTasks(Number(arg));
} else if (command === "list") {
	listTasks();
} else {
	console.log("command is not found!");
}
