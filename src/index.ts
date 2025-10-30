import http from "node:http";
import { URL } from "node:url";
import { getSystemInformation } from "./sysinfo";

export function createServer() {
  return http.createServer(async (req, res) => {
    if (!req.url || !req.method) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "bad_request" }));
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const isSysinfo = req.method === "GET" && url.pathname === "/api/v1/sysinfo";

    if (isSysinfo) {
      try {
        const data = await getSystemInformation();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "internal_error" }));
      }
      return;
    }

    // 404 pour tout autre chemin
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });
}

const PORT = Number(process.env.PORT ?? 8000);
if (process.env.NODE_ENV !== "test") {
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
