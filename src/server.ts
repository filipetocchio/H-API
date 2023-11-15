import express from "express"

import { apiV1Router } from "./routes/router"

const app = express()
app.use(express.json())
app.use(apiV1Router)

app.listen(8080, () => console.log("Server started"))