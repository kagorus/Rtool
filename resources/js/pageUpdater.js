//Code to run when json reading is done
function populateStatus() {
  document.getElementById(
    "jsonsRead"
  ).innerHTML = `Defs Detected :Md:${MechDef.length} Cd:${ChassisDef.length} Wd:${Weapon.length} Hs:${Heatsink.length} Up:${UpgradeDef.length} JJ:${JumpJetDef.length}`;


  document.getElementById("startLoadButton").hidden = true;
}
function updateLoad() {
  // document.getElementById("directoriesRead").innerHTML =
  //   "Directories's Scanned : " + DirectoriesScanned;
  let TotalCache =
    MechDef.length +
    ChassisDef.length +
    Weapon.length +
    Heatsink.length +
    UpgradeDef.length +
    JumpJetDef.length;
  // document.getElementById("CacheRead").innerHTML =
  //   "CacheStatus : " + cacheCount + " / " + TotalCache;
  //Loading Done
    if(TotalCache == cacheCount && cacheCount >0){
      console.log("Caching Complete");
      document.getElementById("searchButton").disabled = false;
      document.getElementById("categoryChooser").removeAttribute("disabled");
      document.getElementById("cacheBarBar").innerHTML=`Loading Complete.`;
    }
    else if (cacheCount == 0){
      document.getElementById("cacheBarBar").innerHTML=`Scanning Folders: ${DirectoriesScanned}`;
    }
    else{
      updateBar(TotalCache,cacheCount);
    }
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
            returnedData = `${returnedData}<div class='returnedItem' onclick='findSelected()' onmouseover='highlight(this)' onmouseleave='dehighlight(this)'>${element.Description.UIName}:${chassis.Tonnage}T : ${chassis.weightClass}</div>`;
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
            returnedData = `${returnedData}<div class='returnedItem'>${element.Description.UIName}: ${element.Tonnage}T :Slots ${element.InventorySize}: Category ${element.Category}</div>`;
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
            returnedData = `${returnedData}<div class='returnedItem'>${element.Description.UIName}: ${element.Tonnage}T :Slots ${element.InventorySize}`;
            ("</div>");
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
            returnedData = `${returnedData}<div class='returnedItem'>${element.Description.UIName}: ${element.Tonnage}T :Slots ${element.InventorySize}</div>`;
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
            returnedData = `${returnedData}<div class='returnedItem'>${element.Description.UIName}: ${element.Tonnage}T :Slots ${element.InventorySize}</div>`;
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


function updateBar(total,current) {
  let elem = document.getElementById("cacheBarBar");
  elem.style.width = `${(current / total) * 100}%`
  elem.innerHTML = `${Math.round(current/total *100)}%`;
} 
