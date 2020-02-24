const fs = require('fs');

try{
    var data = JSON.parse(fs.readFileSync("./src/config.json"));
}catch(err){
    console.log(err);
}

let Config = function(){
    for(var k in data){
        this[k] = data[k];
    }
}

Config.prototype.save = function(){
    try{
        fs.writeFileSync("./src/config.json", JSON.stringify(this, null, 4));
        console.log("Config saved !");
    }catch(err){
        console.log(err);
    }
}

module.exports = new Config();
