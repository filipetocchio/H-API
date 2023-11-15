import { Router } from "express";
import { createLog, deleteLogById, getAllLogs, getlogById } from "../controller/LogController"

export const LogRouter = Router()

// log routes
LogRouter.post("/", createLog)
LogRouter.get("/", getAllLogs)
LogRouter.get("/:id", getlogById)
LogRouter.delete("/:id", deleteLogById)