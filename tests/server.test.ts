import request from "supertest";

// On dit à l'app qu'on est en mode test AVANT les imports
process.env.NODE_ENV = "test";

// On mocke directement NOTRE module 'src/sysinfo' pour garantir un JSON stable
jest.mock("../src/sysinfo", () => ({
  getSystemInformation: jest.fn(async () => ({
    cpu: { manufacturer: "Mock", brand: "CPU", cores: 8 },
    system: { manufacturer: "Mock", model: "Machine" },
    mem: { total: 17179869184, free: 8589934592 }, // 16Go / 8Go
    os: { platform: "linux", distro: "Ubuntu", release: "24.04" },
    currentLoad: { currentload: 12.3 },
    processes: { all: 123, running: 5 },
    diskLayout: [{ device: "/dev/sda", type: "SSD", size: 480 * 2 ** 30 }],
    networkInterfaces: [{ iface: "lo", ip4: "127.0.0.1", internal: true }],
  })),
}));

// On charge ensuite le serveur (après le mock)
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
