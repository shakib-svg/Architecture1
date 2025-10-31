import si from "systeminformation";

export async function getSystemInformation() {
  const [
    cpu, system, mem, os, currentLoad, processes, diskLayout, networkInterfaces
  ] = await Promise.all([
    si.cpu(), si.system(), si.mem(), si.osInfo(),
    si.currentLoad(), si.processes(), si.diskLayout(), si.networkInterfaces()
  ]);

  // ← NE PAS OUBLIER LE RETURN !
  return { cpu, system, mem, os, currentLoad, processes, diskLayout, networkInterfaces };
}
