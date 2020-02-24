const keys = {
    UP: 38,
    DOWN: 40,
    T: 84,
    A: 65,
    E: 69,
    P: 80,
    R: 82,
    F6: 117
}

const selections = {
    TABLE: "table",
    TARIF: "tarif"
}
let selection = "table";
let selectedTableID = null;
let researchTableNumber = "";
let secretCode = "test";
let trackSecretCode = "";

$(window).keydown(function(event){
    let keyCode = event.which;
    switch (keyCode) {
        case keys.UP:
            keyUP();
            break;
        case keys.DOWN:
            keyDown();
            break;
        case keys.T:
            keyT();
            break;
        case keys.A:
            keyA();
            break;
        case keys.E:
            keyE();
            break;
        case keys.P:
            keyP();
            break;
        case keys.R:
            keyR();
            break;
        case keys.F6:
            askSecret();
            break;
        default:
            keyPressed(keyCode);
    }
})

function keyPressed(keyCode){
    if(isNaN(Number(String.fromCharCode(keyCode)))) return;
    if(selection == "table"){
        researchTableNumber += String.fromCharCode(keyCode);
        let table = tablesArray[researchTableNumber - 1];
        if(table){
            if(selectedTableID){
                $(`#${selectedTableID}`).removeClass("selected");
            }
            selectedTableID = table.number;
            $(`#${selectedTableID}`).addClass("selected");
        }
    }
    if(selection == "tarif"){
        if(isNaN(Number(String.fromCharCode(keyCode)))) return;
        if(!selectedTableID) return;
        let table = tablesArray[selectedTableID - 1];
        table.setTarif(String.fromCharCode(keyCode));
    }
}
function keyUP(){
    if(selectedTableID){
        if(selectedTableID - 1 > 0){
            $(`#${selectedTableID}`).removeClass("selected");
            selectedTableID--;
            $(`#${selectedTableID}`).addClass("selected");
        }
    }else{
        if(tablesArray.length > 0){
            selectedTableID = 1;
            $(`#${selectedTableID}`).addClass("selected");
        }
    }
}
function keyDown(){
    if(selectedTableID){
        if(selectedTableID + 1 <= tablesArray.length){
            $(`#${selectedTableID}`).removeClass("selected");
            selectedTableID++;
            $(`#${selectedTableID}`).addClass("selected");
        }
    }else{
        if(tablesArray.length > 0){
            selectedTableID = 1;
            $(`#${selectedTableID}`).addClass("selected");
        }
    }
}
function keyT(){
    researchTableNumber = "";
    selection = "table";
}
function keyA(){
    if(!selectedTableID) return;
    let table = tablesArray.find(function(element){
        return element.number == selectedTableID;
    });
    table.stop();
}
function keyE(){
    if(!selectedTableID) return;
    let table = tablesArray.find(function(element){
        return element.number == selectedTableID;
    });
    table.start();
}
function keyP(){
    if(!selectedTableID) return;
    let table = tablesArray.find(function(element){
        return element.number == selectedTableID;
    });
    table.pause();
}
function keyR(){
    if(!selectedTableID) return;
    selection = "tarif";
    selectedTarifID = 0;
}
function askSecret(){
    let secret = prompt("Entrez le code");
    if(secret === secretCode){
        nw.Window.open('/src/recap.html');
    }
}
