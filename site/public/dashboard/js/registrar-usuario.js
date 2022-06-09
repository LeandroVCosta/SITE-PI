// Função para mostrar a senha
let passLabel = document.getElementById('label-img')
passLabel.addEventListener("click", showPass)
function showPass() {
    if (inp_pass.type == "password") {
        passLabel.src = "../img/sistema/svg/eye_open.svg"
        inp_pass.type = "text"
    } else {
        passLabel.src = "../img/sistema/svg/eye_closed.svg"
        inp_pass.type = "password"
    }
}

// Checando se a senha é válida
document.getElementById('inp_pass').addEventListener("keyup", passCheck)
function passCheck() {
    let pass = document.getElementById('inp_pass').value
    let regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/

    // Verificando se a senha é forte com regex
    if (pass == '') {
        return false
    }
    if (regex.test(pass)) {
        return true
    } else {
        return false
    }
}

// Validando email
document.getElementById('inp_email').addEventListener("keyup", valEmail)
function valEmail() {
    let email = document.getElementById('inp_email').value
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    // Essa expressão não garante a veracidade 100% de um email, para ser 100% precisa mandar confirmação por email

    // Validando email se os caracteres do email é válido
    if (email == '') {
        return false
    }

    if (regex.test(email)) {
        return true
    }

    return false
}

// Validando nome
document.getElementById('inp_name').addEventListener("keyup", valName)
function valName() {
    let name = document.getElementById('inp_name').value
    let regex = /^[a-z].* {1,}[a-z]{1,}/gi

    // Validando a quantidade de palavra e caracteres
    if (name == '') {
        return false
    } else if (regex.test(name)) {
        return true
    } else {
        return false
    }
}

// Validando cargo
document.getElementById('inp_name').addEventListener("keyup", valName)
function valPosition() {
    let position = document.getElementById('inp_name').value
    let regex = /^[a-z].* {1,}[a-z]{1,}/gi

    // Validando a quantidade de palavra e caracteres
    if (position == '') {
        return false
    }

    if (regex.test(position)) {
        return true
    }

    if (position == "Dono" || position == "Chefe") {
        return false
    }
}

document.getElementsByClassName("btn-register")[0].addEventListener("click", registerCheck)
function registerCheck() {
    if (!valEmail() | !valName() | !passCheck() | !valPosition()) {
        return false
    }
    register()
}

function registraruser() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = inp_name.value;
    var emailVar = inp_email.value;
    var senhaVar = inp_pass.value;
    var cnpj = sessionStorage.EMPRESA_CNPJ;
    var cargo = inp_position.value
    // Enviando o valor da nova input
    fetch("/usuarios/registraruser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            cnpjServer: cnpj,
            cargoServer: cargo
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Usuario Registrado com Sucesso!");

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// Chamando função para listar usuário na tabela
window.onload = listarUsuario(sessionStorage.EMPRESA_CNPJ)
function listarUsuario(cnpj) {
    fetch("/usuarios/listarusuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cnpjServer: cnpj
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            plotarTabela(resposta)
        }
    })
}

function plotarTabela(resposta) {
    let tabela = document.getElementById("tabela")
    const qtdFuncionario = document.getElementById("qtdFuncionario")


    resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));

        let count = Object.keys(json).length;
        console.log(count);

        qtdFuncionario.innerHTML = `${count} Usuário(s) encontrado`

        for (let i = 0; i < count; i++) {

            tabela.innerHTML +=
                `
            <tr>
                <th class="txt-center">${json[i].idUsuario}</th>
                <td>${json[i].nomeUsuario}</td>
                <td>${json[i].email}</td>
                <td>${json[i].cargo}</td>
                <td class="pass">
                    <span>******</span>
                    <img src="../img/sistema/svg/eye_closed.svg" alt="Ver senha" title="Ver senha">
                </td>
                <td class="txt-center"><img src="../img/sistema/svg/pencil_writing.svg" alt="Editar usuário"
                        title="Editar usuário"></td>
                <td class="txt-center delete"><img src="../img/sistema/svg/delete.svg" alt="Deletar usuário"
                        title="Deletar usuário" onclick="excluirUsuario(${json[i].idUsuario},${sessionStorage.EMPRESA_CNPJ} ) "></td> 
            </tr>
        `
        }
    });


}

function excluirUsuario(idUsuario, cnpj) {
    // Enviando o valor da nova input
    fetch("/usuarios/excluirUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idUsuarioServer: idUsuario,
            cnpjServer: cnpj
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log("Funcionário excluido com Sucesso!");

        } else {
            throw ("Houve um erro ao excluir funcionários!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}