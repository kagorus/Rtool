let mechCache = [];
let weaponCache = [];
let chassisCache = [];
let heatsinkCache = [];
let upgradeCache = [];
let jumpJetCache = [];
let vehicleChassisCache = [];

async function cacheJsons(type, defType) {
    //

    type.forEach(async (element) => {

      file = element.Directory + "/" + element.FileName;
      try {
        entries = await Neutralino.filesystem.readFile(file);
      } catch (err) {
        console.error(err);
        console.error("There was a problem with : " + file);
      }
      try {
        let data = JSON.parse(entries);
        switch (defType) {
          case "Mech":
            mechCache.push(data);
            break;
          case "Chassis":
            chassisCache.push(data);
            break;
          case "JumpJet":
            jumpJetCache.push(data);
            break;
          case "Weapon":
            weaponCache.push(data);
            break;
          case "Heatsink":
            heatsinkCache.push(data);
            break;
          case "Upgrade":
            upgradeCache.push(data);
            
            break;
  
          default:
            break;
        }
      } catch (error) {
        console.log(error);
        console.log(defType + "  "+data);
      }
    });
  }