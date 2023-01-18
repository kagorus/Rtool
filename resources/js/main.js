 //Makes Neutralino work.
 Neutralino.init();
 
 //Populate Main Page with Data
 
 function populateStatus(){
    document.getElementById("workingDir").innerHTML=WorkingDir;
    document.getElementById("mechsRead").innerHTML=Files.length;

 }
 function updateLoad(){
   document.getElementById("jsonsRead").innerHTML="Directories's Scanned : " + DirectoriesScanned;

}
 