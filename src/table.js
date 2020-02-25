const EventEmitter = require("events");
const recapManager = require("./recapManager");
const moment = require("./moment");
const config = require("./config")

const status = {
    LIBRE: "Libre",
    ENCOURS: "En cours",
    PAUSE: "Pause",
    FINI: "Fini"
}

function Table(number){
    this.number = number;
    this.status = status.LIBRE;
    this.time = 0;
    this.cost = 0;
    this.tarifIndex = 0;
    this.tarifHeure = (number == 1) ? config.tarifs.table1.semaine[this.tarifIndex] : config.tarifs.normal.semaine[this.tarifIndex];
}

Table.prototype = Object.create(EventEmitter.prototype);

Table.prototype.start = function(){
    switch (this.status) {
        case status.FINI:
            this.time = 0;
            this.cost = 0;
            this.setTarif(0)
            break;
        case status.ENCOURS:
            return;
            break;
    }

    this.status = status.ENCOURS;

    this.emit("time", this.time);
    this.emit("status", this.status);
    this.emit("tarif", this.tarifHeure);

    if(!this.interval){
        this.interval = setInterval(() => {
            if(this.status == status.ENCOURS){
                this.time++;
                this.emit("time", this.time);
                this.cost += (this.tarifHeure / 60) / 60;
                this.emit("cost", this.cost);
            }
        }, 1000);
    }
}

Table.prototype.pause = function(){
    switch (this.status) {
        case status.ENCOURS:
            this.status = status.PAUSE;
            this.emit("status", this.status);
            break;
        case status.PAUSE:
            this.status = status.ENCOURS;
            this.emit("status", this.status);
            break;
        default:

    }
}

Table.prototype.stop = function(){
    if(this.status == status.FINI || this.status == status.LIBRE) return;
    this.status = status.FINI;
    this.timestamp = moment().format("DD.MM.YY HH:mm:ss");
    this.emit("status", this.status);
    recapManager.addEntry(this);
    if(this.number == 1){
        this.tarifHeure = tarifTable1[0];
    }else{
        this.tarifHeure = tarifNormal[0];
    }
}

Table.prototype.delete = function(){
    clearInterval(this.interval);
}

Table.prototype.setTarif = function(tarifNumber){
    if(tarifNumber < 0 || tarifNumber > 2) return;
    if(this.status == status.FINI || this.status == status.LIBRE){
        this.tarifIndex = tarifNumber;
        if(this.number == 1){
            this.tarifHeure = config.tarifs.table1.semaine[tarifNumber];
        }else{
            this.tarifHeure = config.tarifs.normal.semaine[tarifNumber];
        }
        this.emit("tarif", this.tarifHeure);
    }
}

Table.prototype.updateTarif = function(){
    if(this.status == status.FINI || this.status == status.LIBRE){
        if(this.number == 1){
            this.tarifHeure = config.tarifs.table1.semaine[this.tarifIndex];
        }else{
            this.tarifHeure = config.tarifs.normal.semaine[this.tarifIndex];
        }
        this.emit("tarif", this.tarifHeure);
    }
}

module.exports = Table;
