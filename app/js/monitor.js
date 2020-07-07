const path = require("path"),
  osu = require("node-os-utils"),
  cpu = osu.cpu,
  mem = osu.mem,
  os = osu.os;

// *** DYNAMIC SYSTEM STATISTICS ***
// *** Run every 2 seconds
setInterval(() => {
  // CPU Usage
  cpu.usage().then((info) => {
    document.getElementById("cpu-usage").innerText = `${info}%`;
  });
}, 2000);

/// *** END ***

// *** STATIC INFORMATION ***
//display CPU model
document.getElementById("cpu-model").innerHTML = cpu.model();
// Display computer name
document.getElementById("comp-name").innerHTML = os.hostname();
// Display OS info
const getOSInfo = () => {
  if (os.type() == "Darwin") {
    return "macOS";
  }
  return os.type();
};
document.getElementById("os").innerText = `${getOSInfo()} ${os.arch()}`;
// total RAM
mem.info().then((info) => {
  document.getElementById("mem-total").innerText = `${
    info.totalMemMb / 1000
  } GB`;
});
/// *** END ***
