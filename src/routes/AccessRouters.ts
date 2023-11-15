import { Router } from "express";
import { createAccess, deleteAccessById, getAccessById, getALLAccesses, patchAccess } from "../controller/AccessController";

export const accessRouter = Router()

// Access routes
accessRouter.post("/", createAccess)
accessRouter.get("/", getALLAccesses)
accessRouter.get("/:id", getAccessById)
accessRouter.patch("/:id", patchAccess)
accessRouter.delete("/:id", deleteAccessById)
