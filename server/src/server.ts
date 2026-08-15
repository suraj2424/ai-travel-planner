import app from "./app/app.ts"
import { config } from "./config/env.ts"

app.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port} in ${config.environment} mode`
  );
});