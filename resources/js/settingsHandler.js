let keys = [];
let data = [];
async function readSetting(setting) {
  // Trys to Read Settings
  try {
    keys = await Neutralino.storage.getKeys();
  } catch (error) {
    console.log("No Settings Set:");
  }

  if (keys.includes(setting)) {
    data = await Neutralino.storage.getData(setting);
  } else {
    data = false;
  }

  switch (setting) {
    case "WorkingDir":
      if (data) {
        console.log("Working dir : " + data);
        return data
      } else {
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
        storeSetting("WorkingDir",entry);
        await Neutralino.app.restartProcess();
      }
      break;

    default:
      break;
  }
}

async function storeSetting(setting,data) {
  try {
    await Neutralino.storage.setData(
      setting,
      JSON.stringify({ Setting: data })
    );
  } catch (error) {
    console.log(error);
  }  
  
}
