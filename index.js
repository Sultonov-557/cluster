const cluster = require("cluster");
const os = require("os");
const express = require("express");

if (cluster.isMaster) {
	// Create a worker for each CPU
	os.cpus().forEach((v, i) => {
		cluster.fork();
		console.log(i);
	});
} else {
	const app = express();

	app.listen(80);

	app.get("/slow", (req, res) => {
		const now = Date.now();
		while (now + 5000 > Date.now()) {}
		res.send("this is slow page");
	});

	app.get("/fast", (req, res) => {
		res.send("this is fast page");
	});
}
