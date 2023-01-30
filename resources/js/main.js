//Makes Neutralino work.
Neutralino.init();


//Read Settings

//Starts Main Json Read
getWorkingDir();

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
function showJsonInfo(input) {}
function updateList() {
  let returnedData = "";
  let category = document.getElementById("categoryChooser").value;
  let search = document.getElementById("searchBox").value;

  switch (category) {
    case "MechDef":
      MechDef.forEach((element) => {
        if (element.FileName.toLowerCase().includes(search)) {
          returnedData =
            returnedData +
            "<div class='returnedItem'>" +
            element.FileName.substr(0) +
            "<div class='returnedItemTools'>"+element.Directory+"</div></div>";
        }
      });
      break;
    case "Weapon":
      Weapon.forEach((element) => {
        if (element.FileName.toLowerCase().includes(search)) {
          returnedData =
            returnedData +
            "<div class='returnedItem'>" +
            element.FileName.substr(0) +
            "</div>";
        }
      });
      break;
    case "Heatsink":
      Heatsink.forEach((element) => {
        if (element.FileName.toLowerCase().includes(search)) {
          returnedData =
            returnedData +
            "<div class='returnedItem'>" +
            element.FileName.substr(0) +
            "</div>";
        }
      });
      break;
    case "UpgradeDef":
      UpgradeDef.forEach((element) => {
        if (element.FileName.toLowerCase().includes(search)) {
          returnedData =
            returnedData +
            "<div class='returnedItem'>" +
            element.FileName.substr(0) +
            "</div>";
        }
      });
      break;
    case "JumpJetDef":
      JumpJetDef.forEach((element) => {
        if (element.FileName.toLowerCase().includes(search)) {
          returnedData =
            returnedData +
            "<div class='returnedItem'>" +
            element.FileName.substr(0) +
            "</div>";
        }
      });
      break;
    default:
      break;
  }
  //Return Data When Done
  document.getElementById("searchData").innerHTML = returnedData;
}
