const recapTables = $("#recapTables");
const fullRecapTables = $("#fullRecapTables");
const recapManager = require("./recapManager");
const fullRecapData = recapManager.getFullRecap();
const recapData = recapManager.getRecap();

const btnRecapDetails = $("#btnRecapDetails");
const divRecapDetails = $("#divRecapDetails");
divRecapDetails.toggle();

const gui = require('nw.gui');
const win = gui.Window.get();

win.on('close', function(event) {
    if(confirm("Voulez-vous vraiment quitter ? Vous ne pourrez plus afficher le récapitulatif de cette session.")){
        recapManager.reset();
        this.close(true);
    }
});

btnRecapDetails.click(function(){
    divRecapDetails.toggle();
});
let recapTotal = 0;

for(let i = 0; i < recapData.length; i++){
    let line = recapData[i];
    recapTotal += line.cost;
    let formatedCost = `${line.cost.toFixed(1)}0 CHF`;
    let duration = moment.duration(line.time, "seconds");
    let formatedTime = duration.format("hh:mm:ss", {trim: false});
    let htmlLine = `<tr><td class="tnumber">${line.number}</td><td class="ttime">${formatedTime}</td><td class="tcost">${formatedCost}</td></tr>`;
    recapTables.append(htmlLine);
}
let total = `<tr><td colspan="2">Total :</td><td>${recapTotal.toFixed(1)}0 CHF</td></tr>`;
recapTables.append(total);

for(let i = 0; i < fullRecapData.length; i++){
    let line = fullRecapData[i];
    console.log(line.time);
    let formatedCost = `${line.cost.toFixed(2)} CHF`;
    let duration = moment.duration(line.time, "seconds");
    let formatedTime = duration.format("hh:mm:ss", {trim: false});
    let htmlLine = `<tr><td class="tnumber">${line.number}</td><td class="tdate">${line.date}</td><td class="ttarif">${line.tarifHeure}</td><td class="ttime">${formatedTime}</td><td class="tcost">${formatedCost}</td></tr>`;
    fullRecapTables.append(htmlLine);
}
