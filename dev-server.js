import { createServer } from "./src/server/index.js";

const PORT = process.env.SERVER_PORT || 3001;
const app = createServer();

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});
