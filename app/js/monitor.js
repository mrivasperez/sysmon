const path = require("path"),
  osu = require("node-os-utils"),
  cpu = osu.cpu,
  mem = osu.mem,
  os = osu.os;

let cpuOverload = 80;

// Change Darwin to macS in System Info
const getOSInfo = () => {
  if (os.type() == "Darwin") {
    return "macOS";
  }
  return os.type();
};

// Show days, hours, mins, seconds
const secondsToDhms = (seconds) => {
  seconds = +seconds;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d, ${h}h, ${m}m, ${s}s`;
};

// *** DYNAMIC SYSTEM STATISTICS ***
// *** Run every 2 seconds
setInterval(() => {
  // CPU Usage
  cpu.usage().then((info) => {
    document.getElementById("cpu-usage").innerText = `${info}%`;
    document.getElementById("cpu-progress").style.width = `${info}%`;
    // make progress bar red if overloaded
    if (info >= cpuOverload) {
      document.getElementById("cpu-progress").style.background = "red";
    } else {
      document.getElementById("cpu-progress").style.background = "black";
    }
  });
  // CPU Free
  cpu.free().then((info) => {
    document.getElementById("cpu-free").innerText = `${info}%`;
  });
  // Get system uptime
  document.getElementById("sys-uptime").innerText = secondsToDhms(os.uptime());
}, 2000);

/// *** END ***

// *** STATIC INFORMATION ***
//display CPU model
document.getElementById("cpu-model").innerHTML = cpu.model();
// Display computer name
document.getElementById("comp-name").innerHTML = os.hostname();
// Display OS info
document.getElementById("os").innerText = `${getOSInfo()} ${os.arch()}`;
// total RAM
mem.info().then((info) => {
  document.getElementById("mem-total").innerText = `${
    info.totalMemMb / 1000
  } GB`;
});
/// *** END ***
