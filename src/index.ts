import http from "http";
import { getSystemInformation } from "./sysinfo"; // ← sans .js

export function createServer() {
  return http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/api/v1/sysinfo") {
      const data = await getSystemInformation();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));              // ← important
      return;
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" })); // ← important
  });
}

const PORT = Number(process.env.PORT ?? 8000);
if (process.env.NODE_ENV !== "test") {
  createServer().listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
  });
}
