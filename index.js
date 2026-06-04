import express from "express"
import mongoose from "mongoose"
import developerRouter from "./Developer/developer.router.js"
import applicationRouter from "./Application/application.router.js"
import dotenv from "dotenv"
import {errorHandler}  from "./middleware/error.handler.js"
import {validateAuthToken} from "./middleware/protected.route.js"
import logsRouter from "./Logs/logs.router.js"
import cors from "cors"

let server = express();

server.use(cors({
  origin: [
    'http://localhost:5173',
    'https://log-management-system-theta.vercel.app'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
}));


dotenv.config()

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/developer", developerRouter)
server.use("/api/applications", validateAuthToken, applicationRouter); 
server.use("/api/applications/:name", validateAuthToken, logsRouter);

server.use(errorHandler)


try {

    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("Connected to the database...");
    const PORT = process.env.PORT || 3001;

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });

} catch (error) {
    console.log("Error connecting to the database...", error);
    process.exit();
}