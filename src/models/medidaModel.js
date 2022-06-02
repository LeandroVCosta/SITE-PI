var database = require("../database/config");

function buscarUltimasMedidas(fkSensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas}
        temperatura, umidade, horario,
                        CONVERT(varchar, horario, 108) as horario
                    FROM dadosSensor
                    WHERE fkSensor = ${fkSensor}
                    ORDER BY idDado DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        temperatura, umidade, horario,
                        DATE_FORMAT(horario,'%H:%i:%s') as horario
                    FROM dadosSensor
                    WHERE fkSensor = ${fkSensor}
                    ORDER BY idDado DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
        temperatura, umidade, 
                        CONVERT(varchar, horario, 108) as horario, 
                        fkSensor 
                        FROM dadosSensor WHERE fkSensor = ${fkSensor} 
                    ORDER BY idDado DESC`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        temperatura, umidade,
                        DATE_FORMAT(horario,'%H:%i:%s') as horario, 
                        fkSensor 
                        FROM dadosSensor WHERE fkSensor = ${fkSensor} 
                    ORDER BY idDado DESC limit 1`;
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
