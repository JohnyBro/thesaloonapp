const fs = require("fs");

try{
    var recapData = JSON.parse(fs.readFileSync("./src/recap.json"));
}catch(err){
    console.log(err);
}

let save = function(){
    try{
        fs.writeFileSync("./src/recap.json", JSON.stringify(recapData, null, 4));
    }catch(err){
        console.log(err);
    }
}

let addEntry = function(table){
    recapData.entries.push({
        number : table.number,
        time: table.time,
        cost: table.cost,
        tarifHeure: table.tarifHeure,
        date: table.timestamp});
    save();
}

let reset = function(){
    recapData.entries = [];
    save();
}

let getRecap = function(){
    let recapTab = [];

    for(let i = 0; i < recapData.entries.length; i++){
        let entry = {};
        entry.number = recapData.entries[i].number;
        entry.time = recapData.entries[i].time;
        entry.cost = recapData.entries[i].cost;
        if(recapTab[entry.number - 1]){
            recapTab[entry.number - 1].time += entry.time;
            recapTab[entry.number - 1].cost += entry.cost;
        }else{
            recapTab[entry.number - 1] = entry;
        }
    }

    let newTab = [];
    //Pour pas avoir de trou dans le tableau
    recapTab.forEach(function(el){
        newTab.push(el);
    });
    return newTab;
}

let getFullRecap = function(){
    let fullRecap = recapData.entries.slice();
    return fullRecap;
}

module.exports = {
    addEntry,
    getRecap,
    reset,
    getFullRecap
}
