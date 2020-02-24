const btnOptions = $("#btnOptions");
const divOptions = $("#divOptions");
divOptions.toggle();
//input table1 semaine
const tarifTable1Semaine_0 = $("#tarifTable1Semaine_0");
tarifTable1Semaine_0.val(config.tarifs.table1.semaine[0]);
const tarifTable1Semaine_1 = $("#tarifTable1Semaine_1");
tarifTable1Semaine_1.val(config.tarifs.table1.semaine[1]);
const tarifTable1Semaine_2 = $("#tarifTable1Semaine_2");
tarifTable1Semaine_2.val(config.tarifs.table1.semaine[2]);
//input table1 dimanche
const tarifTable1Dimanche_0 = $("#tarifTable1Dimanche_0");
tarifTable1Dimanche_0.val(config.tarifs.table1.dimanche[0]);
const tarifTable1Dimanche_1 = $("#tarifTable1Dimanche_1");
tarifTable1Dimanche_1.val(config.tarifs.table1.dimanche[1]);
const tarifTable1Dimanche_2 = $("#tarifTable1Dimanche_2");
tarifTable1Dimanche_2.val(config.tarifs.table1.dimanche[2]);
//input table normales Semaine
const tarifNormalSemaine_0 = $("#tarifNormalSemaine_0");
tarifNormalSemaine_0.val(config.tarifs.normal.semaine[0]);
const tarifNormalSemaine_1 = $("#tarifNormalSemaine_1");
tarifNormalSemaine_1.val(config.tarifs.normal.semaine[1]);
const tarifNormalSemaine_2 = $("#tarifNormalSemaine_2");
tarifNormalSemaine_2.val(config.tarifs.normal.semaine[2]);
//input table normales Dimanche
const tarifNormalDimanche_0 = $("#tarifNormalDimanche_0");
tarifNormalDimanche_0.val(config.tarifs.normal.dimanche[0]);
const tarifNormalDimanche_1 = $("#tarifNormalDimanche_1");
tarifNormalDimanche_1.val(config.tarifs.normal.dimanche[1]);
const tarifNormalDimanche_2 = $("#tarifNormalDimanche_2");
tarifNormalDimanche_2.val(config.tarifs.normal.dimanche[2]);

btnOptions.click(function(){
    divOptions.toggle();
});
//---------------------
tarifTable1Semaine_0.change(function(){
    config.tarifs.table1.semaine[0] = tarifTable1Semaine_0.val();
    updateTables();
    config.save();
});
tarifTable1Semaine_1.change(function(){
    config.tarifs.table1.semaine[1] = tarifTable1Semaine_1.val();
    updateTables();
    config.save();
});
tarifTable1Semaine_2.change(function(){
    config.tarifs.table1.semaine[2] = tarifTable1Semaine_2.val();
    updateTables();
    config.save();
});
//-------------------
tarifTable1Dimanche_0.change(function(){
    config.tarifs.table1.dimanche[0] = tarifTable1Dimanche_0.val();
    updateTables();
    config.save();
});
tarifTable1Dimanche_1.change(function(){
    config.tarifs.table1.dimanche[1] = tarifTable1Dimanche_1.val();
    updateTables();
    config.save();
});
tarifTable1Dimanche_2.change(function(){
    config.tarifs.table1.dimanche[2] = tarifTable1Dimanche_2.val();
    updateTables();
    config.save();
});
//----------------------------
tarifNormalSemaine_0.change(function(){
    config.tarifs.normal.semaine[0] = tarifNormalSemaine_0.val();
    updateTables();
    config.save();
});
tarifNormalSemaine_1.change(function(){
    config.tarifs.normal.semaine[1] = tarifNormalSemaine_1.val();
    updateTables();
    config.save();
});
tarifNormalSemaine_2.change(function(){
    config.tarifs.normal.semaine[2] = tarifNormalSemaine_2.val();
    updateTables();
    config.save();
});
//---------------------------
tarifNormalDimanche_0.change(function(){
    config.tarifs.normal.dimanche[0] = tarifNormalDimanche_0.val();
    updateTables();
    config.save();
});
tarifNormalDimanche_1.change(function(){
    config.tarifs.normal.dimanche[1] = tarifNormalDimanche_1.val();
    updateTables();
    config.save();
});
tarifNormalDimanche_2.change(function(){
    config.tarifs.normal.dimanche[2] = tarifNormalDimanche_2.val();
    updateTables();
    config.save();
});

function updateTables(){
    for(let i = 0; i < tablesArray.length; i++){
        tablesArray[i].updateTarif();
    }
}
