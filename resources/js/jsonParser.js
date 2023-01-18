/* To Do Today :
        Split jsons based on what mod/folder they're in using the mod.json files.
*/
const Directories = [];
const Files = [];
const IgnoreDir =["..",".",".git"]
//Leave me Blank After Writing Directory Chooser
const WorkingDir = "/home/kagorus/RogueTech/";


let readDir = async (dir,slash) => {
    //Checks to make sure WorkingDir is set.
    if(dir != false){
    let entries = '';
    try {
        entries = await Neutralino.filesystem.readDirectory(dir);
    }
    catch(err) {
        console.error(err);
    }
    //console.log(entries);
    //console.log(dir);
    entries.forEach(current => {
        //console.log(current); 
        if(current.type == "FILE" && current.entry.substr(-5) == ".json"){
            //console.log(current.entry);            
            Files.push({FileName:current.entry,"Directory":dir});
        }
        else if(current.type == "DIRECTORY"){
            //console.log(current.entry);
            if(!IgnoreDir.includes(current.entry)){
                Directories.push({ToScan:current.entry,"Directory":dir});
            }
            
        }
    });
    //console.log("Jsons Detected: " + Files.length + "  " + JSON.stringify(Files,null,4));
    //console.log("Folders Detected: " + Directories.length + "  " + JSON.stringify(Directories,null,4));
    //Checks to see if any directories need scanning
    checkDirectories(slash);
  }
  else{
    WorkingDir="No Working Dir Set";
    Files="No Working Dir Set";
  }
}

//Start Reader On App Start
readDir(WorkingDir,"");

function checkDirectories(slash){
    let current = Directories[0].Directory + slash + Directories[0].ToScan;
    //console.log(current);
    Directories.shift();
    if(Directories.length != 0){
        
        //console.log("Folders Detected: " + Directories.length + "  " + JSON.stringify(Directories,null,4));
        readDir(current,"/");
    }
    else{
        //Code To Run When We're done reading json files and sorting them
        populateStatus()
        console.log("Jsons Detected: " + Files.length);
    }
}

// let memoryInfo = await Neutralino.computer.getMemoryInfo();
// console.log(`RAM size: ${memoryInfo.physical.total}B`);