import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
// import path from "path";
import indexRouter from "./routes/index.route.js";
import CustomError from "./models/customError.js";
import errorHandler from "./middlewares/error.middleware.js";
// const __dirname = path.resolve();
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../swagger.json" 
// assert { type: "json" }; // Adjust the path to your Swagger JSON file

const app: Express = express();

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "build")));
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log("main router");
app.use("/api/", indexRouter);

// app.get("/logger", (_, res) => {
//     Logger.error("This is an error log");
//     Logger.warn("This is a warn log");
//     Logger.info("This is a info log");
//     Logger.http("This is a http log");
//     Logger.debug("This is a debug log");
//     res.send("Hello world");
// });

app.get("/", function (req, res) {
    res.status(200).json("Hello from Wound Biologics Team!");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new CustomError(`Can"t find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
