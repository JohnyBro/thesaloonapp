const config = require("./config");
const Table = require("./table");

const buttonAddTable = $("#addTable");
const buttonRemoveTable = $("#removeTable");
const tables = $("#tables");

const gui = require('nw.gui');
const win = gui.Window.get();
win.on('close', function(event) {
    if(confirm("Voulez-vous vraiment quitter ?")){
        this.close(true);
    }
});

let tablesArray = [];

for(let i = 0; i < config.nbTables; i++){
    addTable();
}

buttonAddTable.click(function(){
    addTable();
    config.nbTables++;
    config.save();
});

function addTable(){
    let table = new Table(tablesArray.length + 1);
    tablesArray.push(table);

    let line = `<tr id="${table.number}"><td class="tnumber">${table.number}</td><td class="tstatus">${table.status}</td><td class="ttarif">${table.tarifHeure}</td><td class="ttime">00:00:00</td><td class="tcost">0.00 CHF</td></tr>`;

    tables.append(line);

    function updateTime(time){
        let duration = moment.duration(time, "seconds");
        let formatedTime = duration.format("hh:mm:ss", {trim: false});
        $(`#${table.number}`).find(".ttime").text(formatedTime);
    }

    function updateStatus(status){
        $(`#${table.number}`).find(".tstatus").text(status);
    }

    function updateCost(cost){
        let formatedCost = `${cost.toFixed(1)}0 CHF`;
        $(`#${table.number}`).find(".tcost").text(formatedCost);
    }

    function updateTarif(tarif){
        $(`#${table.number}`).find(".ttarif").text(tarif);
    }

    table.on("time", updateTime);
    table.on("status", updateStatus);
    table.on("cost", updateCost);
    table.on("tarif", updateTarif)
}

buttonRemoveTable.click(function(){
    let table = tablesArray[tablesArray.length - 1];
    if(table){
        table.delete();
        $(`#${table.number}`).remove();
        tablesArray.splice(-1, 1);
    }
    config.nbTables--;
    config.save();
});
