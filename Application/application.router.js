import express from "express";
import {getAllApplicationsController, getApplicationByNameController, createApplicationController, deleteApplicationController} from "./application.controller.js"
const router = express.Router();

router.get("/", getAllApplicationsController);
router.get("/:name", getApplicationByNameController);
router.post("/", createApplicationController);
router.delete("/:name", deleteApplicationController);

export default router;
