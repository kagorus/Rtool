let mechCache = [];
let weaponCache = [];
let chassisCache = [];
let heatsinkCache = [];
let upgradeCache = [];
let jumpJetCache = [];
let vehicleChassisCache = [];
let cacheCount = 0;

async function cacheJsons(type, defType) {
    //

    type.forEach(async (element) => {
      
      file = element.Directory + "/" + element.FileName;
      try {
        entries = await Neutralino.filesystem.readFile(file);
        //console.log("Caching..");
      } catch (err) {
        console.error(err);
        console.error("There was a problem with : " + file);
      }
      try {
        let data = JSON.parse(entries);
        switch (defType) {
          case "Mech":
            mechCache.push(data);
            cacheCount = cacheCount + 1;
            updateLoad()
            break;
          case "Chassis":
            chassisCache.push(data);
            cacheCount = cacheCount + 1;
            updateLoad()
            break;
          case "JumpJet":
            jumpJetCache.push(data);
            cacheCount = cacheCount + 1;
            updateLoad()
            break;
          case "Weapon":
            weaponCache.push(data);
            cacheCount = cacheCount + 1;
            updateLoad()
            break;
          case "Heatsink":
            heatsinkCache.push(data);
            cacheCount = cacheCount + 1;
            updateLoad()
            break;
          case "Upgrade":
            upgradeCache.push(data);
            cacheCount = cacheCount + 1;  
            updateLoad()          
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