var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas}
        temperatura, umidade, horario,
                        CONVERT(varchar, horario, 108) as horario
                    FROM dadosSensor
                    WHERE fkSensor = ${fkSensor}
                    ORDER BY idDado DESC`;
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
        instrucaoSql = `SELECT TOP 1
        temperatura, umidade, 
                        CONVERT(varchar, horario, 108) as horario, 
                        fkSensor 
                        FROM dadosSensor WHERE fkSensor = ${fkSensor} 
                    ORDER BY idDado DESC`;

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
