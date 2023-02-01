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
  let TotalCache =
    MechDef.length +
    ChassisDef.length +
    Weapon.length +
    Heatsink.length +
    UpgradeDef.length +
    JumpJetDef.length;
  document.getElementById("CacheRead").innerHTML =
    "CacheStatus : " + cacheCount + " / " + TotalCache;
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
      weaponCache.forEach((element) => {
        //console.log(element.Description.UIName.toLowerCase());
        try {
          if (
            element.Description.UIName.toLowerCase().includes(
              search.toLowerCase()
            )
          ) {
            returnedData =
              returnedData +
              "<div class='returnedItem'>" +
              element.Description.UIName.substr(0) +
              ": " +
              element.Tonnage +
              "T :" +
              "Slots " +
              element.InventorySize +
              ": Category " +
              element.Category +
              "</div>";
          }
        } catch (error) {
          console.log(error);
          console.log(element);
        }
      });
      break;
    case "Heatsink":
      heatsinkCache.forEach((element) => {
        //console.log(element.Description.UIName.toLowerCase());
        try {
          if (
            element.Description.UIName.toLowerCase().includes(
              search.toLowerCase()
            )
          ) {
            returnedData =
              returnedData +
              "<div class='returnedItem'>" +
              element.Description.UIName.substr(0) +
              ": " +
              element.Tonnage +
              "T :" +
              "Slots " +
              element.InventorySize +''
              "</div>";
          }
        } catch (error) {
          console.log(error);
          console.log(element);
        }
      });
      break;
    case "UpgradeDef":
      upgradeCache.forEach((element) => {
        //console.log(element.Description.UIName.toLowerCase());
        try {
          if (
            element.Description.UIName.toLowerCase().includes(
              search.toLowerCase()
            )
          ) {
            returnedData =
              returnedData +
              "<div class='returnedItem'>" +
              element.Description.UIName.substr(0) +
              ": " +
              element.Tonnage +
              "T :" +
              "Slots " +
              element.InventorySize +
              "</div>";
          }
        } catch (error) {
          console.log(error);
          console.log(element);
        }
      });
      break;
    case "JumpJetDef":
      jumpJetCache.forEach((element) => {
        //console.log(element.Description.UIName.toLowerCase());
        try {
          if (
            element.Description.UIName.toLowerCase().includes(
              search.toLowerCase()
            )
          ) {
            returnedData =
              returnedData +
              "<div class='returnedItem'>" +
              element.Description.UIName.substr(0) +
              ": " +
              element.Tonnage +
              "T :" +
              "Slots " +
              element.InventorySize +
              "</div>";
          }
        } catch (error) {
          console.log(error);
          console.log(element);
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
function findSelected() {
  let data2 = [];
  let toLoad = document.getElementById("selected");
  let data = toLoad.innerHTML.split(":").slice();

  mechCache.forEach((element) => {
    if (element.Description.UIName.includes(data[0])) {
      console.log(element.Description.UIName + "   " + data[0]);
      data2 = element;
    }
  });

  document.getElementById("editor").innerText = JSON.stringify(data2, null, 0);
  console.log(data2);
}
