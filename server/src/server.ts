import app from "./app/app.ts"
import { port } from "./config/env.ts"
const PORT = port;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});