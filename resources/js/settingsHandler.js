let keys = [];
let data = [];
let appSettings = [];
//Reads Keys On Load
async function readKeys() {
  try {
    keys = await Neutralino.storage.getKeys();
    loadSettings();
  } catch (error) {
    console.log("No Settings Set:");
  }

  
  
}
async function loadSettings() {
  data = await readSetting("WorkingDir");
  let readData = JSON.parse(data);
  appSettings.push({ WorkingDir: readData.Setting });
  //checks for .cache folder
  try {
    await Neutralino.filesystem.readDirectory(NL_PATH +"/.cache");
  } catch (error) {
    console.log(error);
    await Neutralino.filesystem.createDirectory(NL_PATH + '/.cache');
  }
  getWorkingDir();
}
async function getWorkingDir() {
  //0 is allways Working Dir
  WorkingDir = appSettings[0].WorkingDir;
  await Neutralino.window.setTitle('Rtool :'+WorkingDir);
  //document.getElementById("workingDir").innerHTML = WorkingDir;
}
async function readSetting(setting) {
  // Trys to Read Settings

  if (keys.includes(setting)) {
    data = await Neutralino.storage.getData(setting);
  } else {
    data = false;
  }

  switch (setting) {
    case "WorkingDir":
      if (data) {
        console.log("Working dir : " + data);
        return data;
      } else {
        resetWorkingDir();
      }
      break;

    default:
      break;
  }
}

async function storeSetting(setting, data) {
  try {
    await Neutralino.storage.setData(
      setting,
      JSON.stringify({ Setting: data })
    );
  } catch (error) {
    console.log(error);
  }
}
async function resetWorkingDir(){
  console.log("No Working Dir Set");

        await Neutralino.os.showMessageBox(
          "Error",
          "No Working Dir Set, Please select your RogueTech folder or Mods Directory"
        );

        let entry = await Neutralino.os.showFolderDialog(
          "Select RogueTech Directory",
          {
            defaultPath: NL_CWD,
          }
        );
        console.log(entry);
        storeSetting("WorkingDir", entry);
        await Neutralino.app.restartProcess();
}