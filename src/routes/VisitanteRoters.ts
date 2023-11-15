import { Router } from "express";
import { createVisitante, deleteVisitanteById, getALLVisitante, getVisitanteById, patchVisitante } from "../controller/VisitanteController";

export const visitanteRouter = Router()

// Efetivo routes
visitanteRouter.post("/", createVisitante)
visitanteRouter.get("/", getALLVisitante)
visitanteRouter.get("/:id", getVisitanteById)
visitanteRouter.patch("/:id", patchVisitante)
visitanteRouter.delete("/:id", deleteVisitanteById)