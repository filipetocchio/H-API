import { Router } from "express";
import { createEfetivo, deleteEfetivoById, getALLEfetivos, getEfetivoById, patchEfetivo } from "../controller/EfetivoController";

export const efetivoRouter = Router()

// Efetivo routes
efetivoRouter.post("/", createEfetivo)
efetivoRouter.get("/", getALLEfetivos)
efetivoRouter.get("/:id", getEfetivoById)
efetivoRouter.patch("/:id", patchEfetivo)
efetivoRouter.delete("/:id", deleteEfetivoById)