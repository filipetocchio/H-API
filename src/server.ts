import express from "express";
import cors from "cors"; // Import the cors middleware
import { apiV1Router } from "./routes/router";

const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:4200'
  }));

app.use(express.json());
app.use(apiV1Router);

app.listen(8080, () => console.log("Server started"));