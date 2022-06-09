var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT Usuario.*, cnpj
	        FROM Usuario
		        JOIN Empresa
			        ON idEmpresa = fkEmpresa
		    WHERE email = '${email}' AND senha = '${senha}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, cargo, nomecorp, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():" ,nome, email, cargo, senha, nomecorp, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
        var instrucao = `
        INSERT INTO Empresa (nomeEmpresa, cnpj) VALUES ('${nomecorp}', '${cnpj}')`;
        console.log("Executando a cadastro Usuario: \n" + instrucao);
        database.executar(instrucao);

        var instrucao = `
        INSERT INTO Usuario (nomeUsuario, email, cargo, senha, fkEmpresa)
        VALUES ('${nome}', '${email}', '${cargo}', '${senha}', (select idEmpresa from Empresa where CNPJ = '${cnpj}'))`;
        console.log("Executando a cadastro Usuario: \n" + instrucao);
        return database.executar(instrucao);
        
    }


function registraruser(nome, email, senha, cargo, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cargo, senha, cnpj);

    var instrucao = `
        INSERT INTO Usuario (nomeUsuario, email, cargo, senha, fkEmpresa)
        VALUES ('${nome}', '${email}', '${cargo}', '${senha}', '(select idEmpresa from Empresa where CNPJ = '${cnpj}')')`;
    console.log("Executando a cadastro Usuario: \n" + instrucao);
    return database.executar(instrucao);

}

module.exports = {
    entrar,
    cadastrar,
    listar,
    registraruser,
};