import si from "systeminformation";

export type ISystemInformation = {
  cpu: si.Systeminformation.CpuData;
  system: si.Systeminformation.SystemData;
  mem: si.Systeminformation.MemData;
  os: si.Systeminformation.OsData;
  currentLoad: si.Systeminformation.CurrentLoadData;
  processes: si.Systeminformation.ProcessesData;
  diskLayout: si.Systeminformation.DiskLayoutData[];
  networkInterfaces:
    | si.Systeminformation.NetworkInterfacesData
    | si.Systeminformation.NetworkInterfacesData[];
};

export async function getSystemInformation(): Promise<ISystemInformation> {
  const [
    cpu,
    system,
    mem,
    os,
    currentLoad,
    processes,
    diskLayout,
    networkInterfaces
  ] = await Promise.all([
    si.cpu(),
    si.system(),
    si.mem(),
    si.osInfo(),
    si.currentLoad(),
    si.processes(),
    si.diskLayout(),
    si.networkInterfaces()
  ]);

  return {
    cpu,
    system,
    mem,
    os,
    currentLoad,
    processes,
    diskLayout,
    networkInterfaces
  };
}
