import { Router } from "express";
import { accessRouter } from "./AccessRouters"
import { efetivoRouter } from "./EfetivoRouters";
import { visitanteRouter } from "./VisitanteRoters";
import { LogRouter } from "./LogRouters";

export const apiV1Router = Router()
apiV1Router.use("/api/v1", apiV1Router)

apiV1Router.use("/access", accessRouter)
apiV1Router.use("/efetivo", efetivoRouter)
apiV1Router.use("/log", LogRouter)
apiV1Router.use("/visitante", visitanteRouter)
