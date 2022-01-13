import express from "express";
import {Router} from "./routes/auto";

const mainApp = express();

function startApp() {
    const port = process.env.PORT || "5555";
    mainApp.use("/", Router);
    mainApp.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    });
}

startApp();
