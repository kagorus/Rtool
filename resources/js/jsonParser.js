var Directories = [];
var Files = [];
var IgnoreDir =["..",".",".git"]
//Leave me Blank After Writing Directory Chooser
var WorkingDir = "/home/kagorus/RogueTech/";

let readDir = async (dir) => {
    let entries = '';
    try {
        entries = await Neutralino.filesystem.readDirectory(dir);
    }
    catch(err) {
        console.error(err);
    }
    console.log(entries);
    
    entries.forEach(current => {
        //console.log(current);
        if(current.type == "FILE" && current.entry.substr(-5) == ".json"){
            //console.log(current.entry);
            // Files.push([current.entry]);
            
            Files.push({"FileName":current.entry,"Directory":dir});
        }
        else if(current.type == "DIRECTORY"){
            //console.log(current.entry);
            // Directories.push(current.entry);
            if(!IgnoreDir.includes(current.entry)){
                Directories.push({"To Scan":current.entry,"Directory":dir});
            }
            
        }
    });
    console.log("Jsons Detected: " + Files.length + "  " + JSON.stringify(Files,null,4));
    console.log("Folders Detected: " + Directories.length + "  " + JSON.stringify(Directories,null,4));
  }
  readDir(WorkingDir);



// let memoryInfo = await Neutralino.computer.getMemoryInfo();
// console.log(`RAM size: ${memoryInfo.physical.total}B`);