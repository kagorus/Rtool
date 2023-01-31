//Code to run when json reading is done
function populateStatus() {
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
  document.getElementById("startLoadButton").hidden = true;
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
  let chassis = [];
  switch (category) {
    case "MechDef":
      mechCache.forEach((element) => {
        //console.log(element);
        try {
          if (
            element.Description.UIName.toLowerCase().includes(
              search.toLowerCase()
            )
          ) {
            chassisCache.forEach((elementc) => {
              let d = elementc.Description.Id;
              //console.log(elementc.Description.Id + "__"+element.ChassisID);
              if (d == element.ChassisID) {
                chassis = elementc;
              }
            });
            //console.log(chassis);
            //console.log(chassis)
            returnedData =
              returnedData +
              "<div class='returnedItem' onclick='findSelected()' onmouseover='highlight(this)' onmouseleave='dehighlight(this)'>" +
              element.Description.UIName.substr(0) +
              ":" +
              chassis.Tonnage +
              "T : " +
              chassis.weightClass +
              "</div>";
          }
        } catch (error) {
          console.log(error);
          console.log(element);
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

function highlight(selected) {
  selected.setAttribute("class", "selected");
  selected.setAttribute("id", "selected");

}
function dehighlight(selected) {
  selected.setAttribute("class", "returnedItem");
  selected.setAttribute("id", "");

}
function findSelected(){
    let data2 = [];
    let toLoad = document.getElementById("selected");
    let data = toLoad.innerHTML.split(":").slice()
    
    mechCache.forEach(element => {
        if(element.Description.UIName.includes(data[0])){
            console.log(element.Description.UIName + "   " + data[0]);
            data2 = element;
        }
        
        
    });

    document.getElementById('editor').innerText= JSON.stringify(data2,null,0);
    console.log(data2);
}