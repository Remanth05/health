import "dotenv/config";
import { createServer } from "./index.js";

const PORT = process.env.PORT || 3000;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Hospital Management System API running on http://localhost:${PORT}`);
});
