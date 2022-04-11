const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const { AllRoutes } = require('./router/router');
const createError = require('http-errors');
class Application {
    #app = express();
    constructor(PORT, DB_URI) {
        this.#app.use(morgan("dev"))
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
        mongoose.connection.on("connected", () => {
            console.log("Mongoose Connected to DataBase");
        })
        mongoose.connection.on("disconnected", () => { console.log("Mongoose Disconnected") })

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }
    createRoutes() {
        this.#app.use(AllRoutes)

    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("URL Not Found | #404"))
        })

        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const status = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(status).json({
                errors: {
                    status,
                    message,
                }
            }
            )
        })
    }


}

module.exports = Application;