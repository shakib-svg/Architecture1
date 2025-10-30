// __mocks__/systeminformation.ts
const mock = {
  cpu: async () => ({ manufacturer: "Mock", brand: "CPU", cores: 8 }),
  system: async () => ({ manufacturer: "Mock", model: "Machine" }),
  mem: async () => ({ total: 16 * 2 ** 30, free: 8 * 2 ** 30 }),
  osInfo: async () => ({ platform: "linux", distro: "Ubuntu", release: "24.04" }),
  currentLoad: async () => ({ currentload: 12.3 }),
  processes: async () => ({ all: 123, running: 5 }),
  diskLayout: async () => ([
    { device: "/dev/sda", type: "SSD", size: 480 * 2 ** 30 }
  ]),
  networkInterfaces: async () => ([
    { iface: "lo", ip4: "127.0.0.1", internal: true }
  ]),
};

export default mock;
// robustesse interop CJS/ESM :
module.exports = mock;
