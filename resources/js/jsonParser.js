console.log("Test 1 2");



let readDir = async () => {
    let entries = '';
    try {
        entries = await Neutralino.filesystem.readDirectory("/home/kagorus/RogueTech/");
    }
    catch(err) {
        console.error(err);
    }
    console.log(entries);
  }
  readDir();

// let memoryInfo = await Neutralino.computer.getMemoryInfo();
// console.log(`RAM size: ${memoryInfo.physical.total}B`);