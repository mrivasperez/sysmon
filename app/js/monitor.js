const path = require("path"),
  osu = require("node-os-utils"),
  cpu = osu.cpu,
  mem = osu.mem,
  os = osu.os;

//display CPU model
document.getElementById("cpu-model").innerHTML = cpu.model();
// dispaly computer name
document.getElementById("comp-name").innerHTML = os.hostname();
