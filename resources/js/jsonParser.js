const Directories = [];
const Files = [];
const IgnoreDir = ["..", ".", ".git"];
const currentDir = [];
const FolderClasses = [];
const JsonIgnore = ["mechdef_deploy_director.json"];

let DirectoriesScanned = 0;

//Sorted JSONS
const Weapon = [];
const MechDef = [];
const ChassisDef = [];
const Heatsink = [];
const UpgradeDef = [];
const JumpJetDef = [];
const VehicleChassisDef = [];

//Leave me Blank After Writing Directory Chooser
let WorkingDir = "";
//Grabs Settings from Setting File
async function getWorkingDir(){
  try {
      let workingdir =await readSetting("WorkingDir");
      WorkingDir = await JSON.parse(workingdir).Setting;
      readDir(WorkingDir,"/");
  } catch (error) {
    console.log(error);
  }
  
}

async function readDir(dir, slash) {
  //Checks to make sure WorkingDir is set.
  if (!dir) {
    //Show user an error.
    console.log("You Forgot to set a working DIR");
    WorkingDir = "No Working Dir Set";
  } else {
    let entries = "";
    //Checks to make sure the directory exsists and throws an error if not (Slows down Scanning a bit)
    try {
      entries = await Neutralino.filesystem.readDirectory(dir);
    } catch (error) {
      console.log(
        "Error no directory set or path doesn't exist: " +
          dir +
          " WorkingDir: " +
          WorkingDir
      );
    }
    entries.forEach((current) => {
      if (current.type == "FILE" && current.entry.substr(-5) == ".json") {
        if (current.entry == "mod.json") {
          readModJson(dir + slash + current.entry, dir);
        } else if (!JsonIgnore.includes(current.entry)) {
          //If Not mod.json
          Files.push({ FileName: current.entry, Directory: dir });
        }
      } else if (current.type == "DIRECTORY") {
        if (!IgnoreDir.includes(current.entry)) {
          Directories.push({ ToScan: current.entry, Directory: dir });
        }
      }
    });
    //Checks to see if any directories need scanning
    checkDirectories(slash);
  }
}

async function readModJson(file, dir) {
  //Checks to make sure WorkingDir is set.
  if (file != false) {
    let entries = "";
    try {
      entries = await Neutralino.filesystem.readFile(file);
    } catch (err) {
      console.error(err);
      console.error("There was a problem with : " + file);
    }
    try {
      let data = JSON.parse(entries).Manifest;
      data.forEach((element) => {
        FolderClasses.push({
          Folder: dir,
          Path: element.Path,
          Type: element.Type,
        });
      });
    } catch (error) {}
  }
}

function checkDirectories(slash) {
  let current = Directories[0].Directory + "/" + Directories[0].ToScan;
  Directories.shift();
  if (Directories.length != 0) {
    readDir(current, "/");

    DirectoriesScanned++;
    updateLoad();
  } else {
    sortJsons();
    //Code To Run When We're done reading json files and sorting them
    populateStatus();
    console.log("Jsons Detected: " + Files.length);
    console.log(
      "First Json: " + Files[0].FileName + " : " + Files[0].Directory
    );
  }
}

function sortJsons() {
  Files.forEach((element) => {
    let lookupPath = element.Directory;
    lookupPath = lookupPath.split("/").pop();
    let found = FolderClasses.filter(
      (FolderClasses) => FolderClasses.Path == lookupPath
    );

    if (found.length && !JsonIgnore.includes(element.FileName)) {
      data = found[0].Type;
      switch (data) {
        case "MechDef":
          MechDef.push(element);
          break;
        case "ChassisDef":
          ChassisDef.push(element);
          break;
        case "WeaponDef":
          Weapon.push(element);
          break;
        case "HeatSinkDef":
          Heatsink.push(element);
          break;
        case "UpgradeDef":
          UpgradeDef.push(element);
          break;
        case "JumpJetDef":
          JumpJetDef.push(element);
          break;
        case "VehicleChassisDef":
          VehicleChassisDef.push(element);
          break;
        default:
          break;
      }
    }
  });
  console.log("Mechs Detected :  " + MechDef.length);
  console.log("Chassis Detected :  " + ChassisDef.length);
  console.log("Weapons Detected :  " + Weapon.length);
  console.log("HeatSinks Detected :  " + Heatsink.length);
  console.log("Upgrades Detected :  " + UpgradeDef.length);
  console.log("VehicleChassis Detected :  " + VehicleChassisDef.length);
  //CAB TEST CODE DO NOT CALL IT FROM HERE ANYMORE
  //findUnusedModels(ChassisDef,VehicleChassisDef);
}
