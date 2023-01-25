/*
    
*/

//CAB TEST
//cabTest();
const matched = [];
const fullDef = [];
const strippedCABDefs = [];
let counter = 0;
const outputList = [];
let output = "";
let firstpass = 1;
let cabAssets = [];
let prefabsUsed = [];
//CAB TEST CODE
//Legacy
const CabTank = "/home/kagorus/Games/RtlCache/CabCache/cabTank/CAB-Tank/";

const Cabs = [
  {
    Cab: "/home/kagorus/Games/RtlCache/CabCache/cabTank/CAB-Tank/",
    Name: "CAB-Tank",
  },
  {
    Cab: "/home/kagorus/Games/RtlCache/CabCache/cabClan/CAB-Clan Mech/",
    Name: "CAB-Clan",
  },
  {
    Cab: "/home/kagorus/Games/RtlCache/CabCache/cabCU/CAB-CU/",
    Name: "CAB-CU",
  },
  {
    Cab: "/home/kagorus/Games/RtlCache/CabCache/cabMisc/CAB-Misc/",
    Name: "CAB-Misc",
  },
  {
    Cab: "/home/kagorus/Games/RtlCache/CabCache/cab3025/CAB-3025/",
    Name: "CAB-3025",
  },
  {
    Cab: "/home/kagorus/Games/RtlCache/CabCache/cabIs/CAB-IS Mech/",
    Name: "CAB-IS Mech",
  },
  {
    Cab: "/home/kagorus/Games/RtlCache/CabCache/cabMisc/CAB-Misc/",
    Name: "CAB-Misc",
  },
];
async function cabTest() {
  //stripvChassisDef();

  let entries = "";
  let lastMatch = "";

  VehicleChassisDef.forEach(async (element) => {
    try {
      //console.log(element.Directory + element.FileName);
      entries = await Neutralino.filesystem.readFile(
        element.Directory + "/" + element.FileName
      );
      //console.log(entries);
    } catch (err) {
      console.error(err);
      console.error("There was a problem with : " + file);
    }
    try {
      let data = JSON.parse(entries).PrefabIdentifier;
      let name = JSON.parse(entries).Description.Id;
      //console.log(data)
      let file = await Neutralino.filesystem.readFile(CabTank + "mod.json");
      let data2 = JSON.parse(file).Manifest;
      data2.forEach((element) => {
        let lookupPath = element.AssetBundleName;
        //console.log(data +":"+lookupPath);
        document.getElementById("counter").innerHTML = lookupPath;
        if (data.match(lookupPath) && lastMatch != name) {
          lastMatch = name;
          //console.log("Match! : " + name + " : " + data);
          outputList.push({ Chassis: name, Asset: data });
          output = output + "<div>" + name + "," + data + "</div><br>";
        }
      });

      //console.log(element.FileName +" : "+ data);
    } catch (error) {
      console.log(error);
    }
  });
}

async function findUnusedModels(mechs, tanks) {
  //console.log(mechs);
  //console.log(tanks);

  mechs.forEach(async (element) => {
    try {
      //console.log(element.Directory + element.FileName);
      entries = await Neutralino.filesystem.readFile(
        element.Directory + "/" + element.FileName
      );
      //console.log(entries);
      let data = JSON.parse(entries).PrefabIdentifier;
      try {
        let data2 =JSON.parse(entries).CustomParts.AlternateRepresentations;
        dataPrefabLAM =data2[0].PrefabIdentifier;

        prefabsUsed.push({ Prefab: dataPrefabLAM });
      } catch (error) {
        //console.log(error);
      }
      
      
      prefabsUsed.push({ Prefab: data });
    } catch (err) {
      console.error(err);
      console.error("There was a problem with : " + file);
    }
  });
  tanks.forEach(async (element) => {
    try {
      //console.log(element.Directory + element.FileName);
      entries = await Neutralino.filesystem.readFile(
        element.Directory + "/" + element.FileName
      );
      //console.log(entries);
      let data = JSON.parse(entries).PrefabIdentifier;
      prefabsUsed.push({ Prefab: data });
    } catch (err) {
      console.error(err);
      console.error("There was a problem with : " + file);
    }
  });
  //console.log(Cabs);
  Cabs.forEach(async (element) => {
    let file = await Neutralino.filesystem.readFile(element.Cab + "mod.json");
    let data2 = JSON.parse(file).Manifest;
    data2.forEach((element1) => {
      let lookup = element1.AssetBundleName;
      let found = prefabsUsed.filter(
        (prefabsUsed) => prefabsUsed.Prefab == lookup
      );
      //console.log(found[0]);
      if (lookup && !found[0]) {
        cabAssets.push({ Prefab: lookup });
        output =
          output +
          "<div>" +
          "Prefab" +
          "," +
          lookup +
          "," +
          element.Name +
          "</div><br>";
      }
    });
  });

  //console.log(prefabsUsed);
  console.log(cabAssets);
}
