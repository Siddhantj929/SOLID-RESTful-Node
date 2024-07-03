var cluster = require("cluster");
var os = require("os");
const config = require("./config");

const CPUs = os.cpus();

// Adding parallel processing support by using cluster of multiple cores
if (cluster.isMaster && !config.app.isDev) {
    CPUs.forEach(() => {
        cluster.fork();
    });

    cluster.on("listening", (worker) => {
        console.log(`Cluster ${worker.process.pid} connected.`);
    });

    cluster.on("disconnect", (worker) => {
        console.log(`Cluster ${worker.process.pid} disconnected.`);
    });

    cluster.on("exit", (worker) => {
        console.log(`Cluster ${worker.process.pid} is dead.`);

        // Ensuring a new cluster will start if an old one dies
        cluster.fork();
    });
} else {
    const { connectToDatabase } = require("./database");

    // Connecting to the database
    connectToDatabase()
        .then(() => require("./app").start())
        .catch((err) =>
            console.log("Error while starting the app.\n\n=>", err)
        );
}
