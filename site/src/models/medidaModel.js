var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select TOP 7 temperatura as Temperatura, umidade as Umidade, Horario as horario from DadosSensor join Sensor on
        IdSensor = FkSensor where IdSensor = ${idSensor} order by horario desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select temperatura as Temperatura, umidade as Umidade, Horario as horario from DadosSensor join Sensor on
        IdSensor = FkSensor where IdSensor = ${idSensor} order by horario desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select TOP 1 temperatura as Temperatura, umidade as Umidade, Horario as horario from DadosSensor join Sensor on
        IdSensor = FkSensor where IdSensor = ${idSensor} order by horario desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select temperatura as Temperatura, umidade as Umidade, Horario as horario from DadosSensor join Sensor on
        IdSensor = FkSensor where IdSensor = '${idSensor}' limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
