//Makes Neutralino work.
Neutralino.init();

//Starts Main Json Read
readDir(WorkingDir, "/");

//Populate Main Page with Data

//Code to run when json reading is done
function populateStatus() {
  document.getElementById("workingDir").innerHTML = WorkingDir;
  document.getElementById("jsonsRead").innerHTML =
    "Defs Detected :" +
    "Md:" +
    MechDef.length +
    " Cd:" +
    ChassisDef.length +
    " Wd:" +
    Weapon.length +
    " Hs:" +
    Heatsink.length +
    " Up:" +
    UpgradeDef.length +
    " JJ:" +
    JumpJetDef.length;

  document.getElementById("searchButton").disabled = false;
  document.getElementById("categoryChooser").removeAttribute("disabled");
}
function updateLoad() {
  document.getElementById("directoriesRead").innerHTML =
    "Directories's Scanned : " + DirectoriesScanned;
}

function updateList() {
  let returnedData = "";
  let category = document.getElementById("categoryChooser").value;
  let search = document.getElementById("searchBox").value;

  switch (category) {
    case "MechDef":
      MechDef.forEach((element) => {
        returnedData =
          returnedData +
          "<div class='returnedItem'>" +
          element.FileName.substr(8) +
          "</div>";
      });
      break;
    case "Weapon":
      Weapon.forEach((element) => {
        returnedData =
          returnedData +
          "<div class='returnedItem'onclick(showJsonInfo('" +
          element.Directory +
          element.FileName +
          "'))>" +
          element.FileName.substr(7) +
          "</div>";
      });
      break;
    default:
      break;
  }

  //console.log(category + "  " + returnedData);
  document.getElementById("searchData").innerHTML = returnedData;
}
