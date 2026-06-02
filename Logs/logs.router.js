import express from "express";
import {getAllApplicationLogsController, postLogsApplicationController} from "./logs.controller.js"
import { trusted } from "mongoose";


const logsRouter = express.Router({
    mergeParams:true
});

logsRouter.get("/logs", getAllApplicationLogsController);
logsRouter.post("/logs", postLogsApplicationController);

export default logsRouter;