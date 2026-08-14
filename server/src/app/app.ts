import express from "express"
import router from "./routes"
import { API_PREFIX, API_VERSION } from "../config/constants"
const app = express();
import logRequests from "../shared/middleware/requestLogger";
import notFound from "../shared/middleware/notFound";
import errorHandler from "../shared/middleware/errorHandler";

app.use(express.json())

app.use(logRequests);
app.use(`${API_PREFIX}${API_VERSION}`, router);
app.use(notFound)
app.use(errorHandler)
export default app;