//Makes Neutralino work.
Neutralino.init();

//Starts Main Json Read
readDir(WorkingDir, "/");

//Populate Main Page with Data

function populateStatus() {
  document.getElementById("workingDir").innerHTML = WorkingDir;
  document.getElementById("mechsRead").innerHTML = MechDef.length;
}
function updateLoad() {
  document.getElementById("jsonsRead").innerHTML =
    "Directories's Scanned : " + DirectoriesScanned;
}
