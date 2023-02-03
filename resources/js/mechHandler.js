let currentMech = [];
let currentLocations= [];
let currentChassis=[];
function findSelected() {
  let data2 = [];
  let toLoad = document.getElementById("selected");
  let data = toLoad.innerHTML.split(":").slice();

  mechCache.forEach((element) => {
    if (element.Description.UIName.includes(data[0])) {
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
  let locations = `<div class="mechSection">Locations:

  ${buildField(currentMech.Locations.Head, "text", "locHead")}
  ${buildField(currentMech.Locations.LeftArm, "text", "locLeftArm")}
  ${buildField(currentMech.Locations.LeftTorso, "text", "locLeftTorso")}
  ${buildField(currentMech.Locations.CenterTorso, "text", "locCenterTorso")}
  ${buildField(currentMech.Locations.RightTorso, "text", "locRightTorso")}
  ${buildField(currentMech.Locations.RightArm, "text", "locRightArm")}
  ${buildField(currentMech.Locations.LeftLeg, "text", "locLeftLeg")}
  ${buildField(currentMech.Locations.RightLeg, "text", "locRightLeg")}
  </div>`;
  document.getElementById("editorGUI").innerHTML = `${description}${locations}`;
}
function buildLocation(field){

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
