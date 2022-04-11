const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

class Application {
    #app = express();
    #DB_URI; #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;

        this.configApplication();
        this.connectToMongoDB(DB_URI);
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandling();



    }
    configApplication() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", 'public')))

    }
    createServer(PORT) {
        const http = require('http');
        http.createServer(this.#app).listen(PORT, () => {
            console.log(`Watching on > http://localhost:${PORT}`);
        })
    }
    connectToMongoDB(DB_URI) {
        mongoose.connect(DB_URI, (error) => {
            if (!error) return console.log("Connected to DataBase Successfully ...");
            return console.log("Failed to Connect to DataBase");
        })

    }
    createRoutes() {

    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: "URL Not Found ! #404",
                success: false,
            })
        })

        this.#app.use((error, req, res, next) => {
            const status = error.status;
            const message = error.message || "InternalServerError";
            return res.status(status).json({
                status,
                message,
            })
        })
    }


}

module.exports = Application;