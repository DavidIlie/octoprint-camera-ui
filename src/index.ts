require("dotenv").config();
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import request from "request";

import { octoRequest } from "./lib/octoRequest";
import { durationFormatter } from "./lib/durationFormatter";

const main = async () => {
    const app = express();

    app.use(morgan("dev"));
    app.use(helmet());
    app.use(cors());

    app.use(express.static("./public"));

    app.set("view engine", "ejs");

    app.get("/video", (_req: express.Request, res: express.Response) => {
        request(`${process.env.OCTO_PRINT_URL}/webcam/?action=stream`).pipe(
            res
        );
    });

    app.get("/", async (_req: express.Request, res: express.Response) => {
        const jobR = await octoRequest(`/api/job`);
        const jobResponse = await jobR.data;

        const printerR = await octoRequest(`/api/printer`);
        const printerResponse = await printerR.data;

        const printingState =
            printerResponse.state.text === "Operational"
                ? "Nothing"
                : jobResponse.state === "Printing"
                ? jobResponse.progress.completion <= 0.1
                    ? "Heating"
                    : "Printing"
                : "Nothing";

        res.set("Content-Security-Policy", "img-src * 'self' data: http:");
        res.render("../public/index", {
            printingState,
            temps: {
                bed: printerResponse.temperature.bed.actual,
                nozzle: printerResponse.temperature.tool0.actual,
            },
            file: {
                name: jobResponse.job.file.name,
                duration: durationFormatter(jobResponse.progress.printTimeLeft),
            },
        });
    });

    const port = process.env.PORT || 2412;
    app.listen(port, () => {
        console.log(`app running on http://127.0.0.1:${port}`);
    });
};

main();
