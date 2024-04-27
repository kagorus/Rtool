let mechCache = [];
let weaponCache = [];
let chassisCache = [];
let heatsinkCache = [];
let upgradeCache = [];
let jumpJetCache = [];
let vehicleChassisCache = [];
let cacheCount = 0;
let fileCache = 0;
async function cacheJsons(type, defType) {
  type.forEach(async (element) => {
    file = element.Directory + "/" + element.FileName;
    try {
      entries = await Neutralino.filesystem.readFile(file);
      //console.log("Caching..");
    } catch (err) {
      console.error(err);
      console.error(`There was a problem with : ${file}`);
    }
    try {
      let data = JSON.parse(entries);
      switch (defType) {
        case "Mech":
          mechCache.push(data);
          cacheCount = cacheCount + 1;
          updateLoad();
          break;
        case "Chassis":
          chassisCache.push(data);
          cacheCount = cacheCount + 1;
          updateLoad();
          break;
        case "JumpJet":
          jumpJetCache.push(data);
          cacheCount = cacheCount + 1;
          updateLoad();
          break;
        case "Weapon":
          weaponCache.push(data);
          cacheCount = cacheCount + 1;
          updateLoad();
          break;
        case "Heatsink":
          heatsinkCache.push(data);
          cacheCount = cacheCount + 1;
          updateLoad();
          break;
        case "Upgrade":
          upgradeCache.push(data);
          cacheCount = cacheCount + 1;
          updateLoad();
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      console.log(
        `${defType}  ${entries}  ${data} : ${file} ${element.FileName}`
      );
      // document.getElementById("editorGUI").innerHTML=`Comma Detected in ${element.FileName}`
      // document.getElementById("statusBar").style="background-color:red";
      await Neutralino.os.showMessageBox(
        "Error",
        `Comma Detected In ${element.FileName} Correct File To Continue`
      );
    }
  });
}

function hashCode(object) {
  try {
    let hash = 0;
    for (var i = 0; i < object.length; i++) {
      let code = object.charCodeAt(i);
      hash = (hash << 5) - hash + code;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  } catch (error) {
    console.log(`Error : ${error} Data : ${object}`);
  }
}

async function writeCache() {
  await Neutralino.filesystem.writeFile(
    NL_PATH + "/.cache/mechCache.json",
    JSON.stringify(mechCache)
  );
  await Neutralino.filesystem.writeFile(
    NL_PATH + "/.cache/weaponCache.json",
    JSON.stringify(weaponCache)
  );
  await Neutralino.filesystem.writeFile(
    NL_PATH + "/.cache/chassisCache.json",
    JSON.stringify(chassisCache)
  );
  await Neutralino.filesystem.writeFile(
    NL_PATH + "/.cache/heatsinkCache.json",
    JSON.stringify(heatsinkCache)
  );
  await Neutralino.filesystem.writeFile(
    NL_PATH + "/.cache/upgradeCache.json",
    JSON.stringify(upgradeCache)
  );
  await Neutralino.filesystem.writeFile(
    NL_PATH + "/.cache/jumpJetCache.json",
    JSON.stringify(jumpJetCache)
  );
  try {
    await Neutralino.filesystem.writeFile(
      NL_PATH + "/.cache/hash.json",
      JSON.stringify({ Cache: fileCache })
    );
  } catch (error) {
    console.log(error);
  }
}

async function checkCache() {
  try {
    let data = await Neutralino.filesystem.readFile(
      NL_PATH + "/.cache/hash.json"
    );
    let dataHash = JSON.parse(data).Cache;
    if (dataHash == fileCache) {
      console.log("Same.");
      return true;
    } else {
      console.log("Not Same.");
      return false;
    }
  } catch (error) {
    //Handles Cache File been missing
    console.log(`Error:  ${JSON.stringify(error)}`);
    await Neutralino.filesystem.writeFile(
      NL_PATH + "/.cache/hash.json",
      JSON.stringify(fileCache)
    );
    return false;
  }
}

async function readCache() {
  mechCache = JSON.parse(
    await Neutralino.filesystem.readFile(NL_PATH + "/.cache/mechCache.json")
  );
  weaponCache = JSON.parse(
    await Neutralino.filesystem.readFile(NL_PATH + "/.cache/weaponCache.json")
  );
  chassisCache = JSON.parse(
    await Neutralino.filesystem.readFile(NL_PATH + "/.cache/chassisCache.json")
  );
  heatsinkCache = JSON.parse(
    await Neutralino.filesystem.readFile(NL_PATH + "/.cache/heatsinkCache.json")
  );
  upgradeCache = JSON.parse(
    await Neutralino.filesystem.readFile(NL_PATH + "/.cache/upgradeCache.json")
  );
  jumpJetCache = JSON.parse(
    await Neutralino.filesystem.readFile(NL_PATH + "/.cache/jumpJetCache.json")
  );
  cacheCount =
    MechDef.length +
    ChassisDef.length +
    Weapon.length +
    Heatsink.length +
    UpgradeDef.length +
    JumpJetDef.length;
  updateLoad();
}
