import request from "supertest";

process.env.NODE_ENV = "test";          // ← avant tout
jest.mock("systeminformation");          // ← avant tout

const { createServer } = require("../src/index");

describe("API sysinfo", () => {
  const app = createServer();

  it("GET /api/v1/sysinfo -> 200 + JSON forme minimale", async () => {
    const res = await request(app).get("/api/v1/sysinfo");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);

    for (const key of [
      "cpu",
      "system",
      "mem",
      "os",
      "currentLoad",
      "processes",
      "diskLayout",
      "networkInterfaces",
    ]) {
      expect(res.body).toHaveProperty(key);
    }
    expect(Array.isArray(res.body.diskLayout)).toBe(true);
  });

  it("GET / -> 404 not_found", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "not_found" });
  });
});
