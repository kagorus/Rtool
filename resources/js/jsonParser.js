const Directories = [];
const Files = [];
const IgnoreDir = ["..", ".", ".git"];
const currentDir = [];
const FolderClasses = [];
const JsonIgnore = [];
let DirectoriesScanned = 0;

//Sorted JSONS
const Weapon = [];
const MechDef = [];
const ChassisDef = [];
const Heatsink = [];
const UpgradeDef = [];
const JumpJetDef = [];

//Leave me Blank After Writing Directory Chooser
const WorkingDir = "/home/kagorus/RogueTech";

async function readDir(dir, slash) {
  //Checks to make sure WorkingDir is set.
  if (!dir) {
    //Show user an error.
    console.log("You Forgot to set a working DIR");
    WorkingDir = "No Working Dir Set";
    //Files = "No Working Dir Set";
  } else {
    let entries = "";
    //Checks to make sure the directory exsists and throws an error if not (Slows down Scanning a bit)
    if (Neutralino.filesystem.readDirectory(dir).code !== "NE_FS_NOPATHE") {
      entries = await Neutralino.filesystem.readDirectory(dir);
      //if(Neutralino.filesystem.getStats(dir)){}

      //console.log(entries);
      //console.log(dir);
      entries.forEach((current) => {
        //console.log(current);
        if (current.type == "FILE" && current.entry.substr(-5) == ".json") {
          //console.log(current.entry);
          if (current.entry == "mod.json") {
            readModJson(dir + slash + current.entry, dir);
          } else if (!JsonIgnore.includes(current.entry)) {
            //If Not mod.json
            Files.push({ FileName: current.entry, Directory: dir });
          }
        } else if (current.type == "DIRECTORY") {
          //console.log(current.entry);
          if (!IgnoreDir.includes(current.entry)) {
            Directories.push({ ToScan: current.entry, Directory: dir });
          }
        }
      });
      //console.log("Jsons Detected: " + Files.length + "  " + JSON.stringify(Files,null,4));
      //console.log("Folders Detected: " + Directories.length + "  " + JSON.stringify(Directories,null,4));
      //Checks to see if any directories need scanning
      checkDirectories(slash);
    } else {
      //Dump An Error here.
      console.log(
        "Error no directory set or path doesn't exist: " +
          dir +
          " WorkingDir: " +
          WorkingDir
      );
    }
  }
}

async function readModJson(file, dir) {
  //console.log(file);
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
        //console.log(element);
        FolderClasses.push({
          Folder: dir,
          Path: element.Path,
          Type: element.Type,
        });
      });
      //console.log(JSON.parse(entries).Manifest);
    } catch (error) {}
  }
}

function checkDirectories(slash) {
  let current = Directories[0].Directory + "/" + Directories[0].ToScan;
  //console.log(current);
  Directories.shift();
  if (Directories.length != 0) {
    //console.log("Folders Detected: " + Directories.length + "  " + JSON.stringify(Directories,null,4));
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
    //console.log("Folders Scanned :" + JSON.stringify(FolderClasses,null,2));
    //console.log(JSON.stringify(FolderClasses[0].Folder, null, 4));
    //console.log("Json is of : " + found[0].Type + " Type");
  }
}

function sortJsons() {
  Files.forEach((element) => {
    let lookupPath = element.Directory;
    lookupPath = lookupPath.split("/").pop();
    //console.log(lookupPath);
    let found = FolderClasses.filter(
      (FolderClasses) => FolderClasses.Path == lookupPath
    );

    //console.log (found);
    if (found.length) {
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

  //console.log(Heatsink);
}
