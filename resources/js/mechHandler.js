let currentMech = [];
let currentLocations = [];
let currentChassis = [];
function findSelected() {
  let data2 = [];
  let toLoad = document.getElementById("selected");
  let data = toLoad.innerHTML.split(":").slice();

  mechCache.forEach((element) => {
    if (element.Description.UIName == (data[0])) {
      console.log(element.Description.UIName + "   " + data[0]);
      data2 = element;
      chassisCache.forEach((elementChassis) => {
        let d = elementChassis.Description.Id;
        //console.log(elementc.Description.Id + "__"+element.ChassisID);
        if (d == element.ChassisID) {
          currentChassis = elementChassis;
          console.log(currentChassis);
        }
      });
    }
  });

  document.getElementById("editor").innerText = JSON.stringify(data2, null, 0);
  currentMech = data2;
  buildMech();
  console.log(data2);
}

function buildMech() {
  let description = `<div class="mechSection">Description:

  ${buildField(currentMech.ChassisID, "text", "ChassisID")}
  ${buildField(currentMech.Description.Details, "textarea", "Description")}
  ${buildField(currentMech.Description.Icon, "text", "Icon")}
  ${buildField(currentMech.Description.Id, "text", "Id")}
  ${buildField(currentMech.Description.Rarity, "text", "Rarity")}
  ${buildField(currentMech.Description.UIName, "text", "UIName")}
  </div>`;
  let locations = `<div class="mechSection">Locations:<br>
  ${buildLocations()}
  </div>`;
  document.getElementById("editorGUI").innerHTML = `${description}${locations}`;
}
function buildLocations() {
  let locations = currentMech.Locations;
  let data = "";
  let chassisLoc = currentChassis.Locations;
  locations.forEach((element, index) => {
    data = `${data}
  <div class ="mechDetail" >${element.Location}: 
  FA <input type="number" id="${element.Location}" name="${element.Location}" min="0" max="${chassisLoc[index].MaxArmor}" value="${element.CurrentArmor}">Max:${chassisLoc[index].MaxArmor} ::
  RA <input type="number" id="${element.Location}" name="${element.Location}" min="0" max="${chassisLoc[index].MaxRearArmor}" value="${element.CurrentRearArmor}">Max:${chassisLoc[index].MaxRearArmor}::
  STR <input type="number" id="${element.Location}" name="${element.Location}" min="0" max="${chassisLoc[index].InternalStructure}" disabled="true" value="${element.CurrentInternalStructure}"></div>
  
  `;
  });
  return data;
}
function buildField(field, type, label) {
  switch (type) {
    case "text":
      return `<div class="mechDetail"><label for="${label}">${label}</label>
            <input type="text" id="${label}" name="${label}" class="mechTextBox" value="${field}"></div>`;
    case "textarea":
      return `<div class="mechDetail"><label for="${label}">${label}</label>
     <textarea class="mechTextArea"id="${label}" name="${label}">${field}</textarea></div>  `;

    default:
      break;
  }
}
