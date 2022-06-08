// Checando se a senha é válida
document.getElementById('inp_pass').addEventListener("keyup",passCheck)
function passCheck() {
    let pass = document.getElementById('inp_pass').value
    let regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/

    // Verificando se a senha é forte com regex
    if (pass == '') {
        warning_pass.innerHTML = 'Digite uma senha'
        warning_pass.className = 'invalid'
        return false
    }

    if (regex.test(pass)) {
        warning_pass.innerHTML = ''
        warning_pass.className = 'valid'
        return true
    } else {
        warning_pass.className = 'missing'
        warning_pass.innerHTML = 'Use oito ou mais caracteres com uma combinação de letras, números e símbolos: @ ! # $ % ^ & * ( ) / e \\'
        return false
    }
}

// Checando se as duas senhas são iguais
document.getElementById('inp_pass_conf').addEventListener("keyup",valPass)
function valPass() {
    let pass = document.getElementById('inp_pass').value
    let passConf = document.getElementById('inp_pass_conf').value

    if (passConf.length >= 6) {
        if (pass == passConf) {
            warning_pass_conf.className = 'valid'
            warning_pass_conf.innerHTML = ''
            return true
        } else {
            warning_pass_conf.className = 'invalid'
            warning_pass_conf.innerHTML = 'As senhas não conferem'
            return false
        }
    } else {
        warning_pass_conf.className = 'missing'
        warning_pass_conf.innerHTML = 'Senha com menos de 6 digitos'
        return false
    }
}

// Validando email
document.getElementById('inp_email').addEventListener("keyup",valEmail)
function valEmail() {
    let email = document.getElementById('inp_email').value
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    // Essa expressão não garante a veracidade 100% de um email, para ser 100% precisa mandar confirmação por email

    // Validando email se os caracteres do email é válido
    if (email == '') {
        warning_email.className = 'invalid'
        warning_email.innerHTML = 'Digite um email válido'
        return false
    }

    if (regex.test(email)) {
        warning_email.innerHTML = ''
        warning_email.className = 'valid'
        return true
    } else {
        warning_email.className = 'missing'
        warning_email.innerHTML = 'Digite um email válido'
        return false
    }
}

// Validando nome
document.getElementById('inp_name').addEventListener("keyup",valName)
function valName() {
    let name = document.getElementById('inp_name').value
    let regex = /^[a-z].* {1,}[a-z]{1,}/gi

    // Validando a quantidade de palavra e caracteres
    if (name == '') {
        warning_name.className = 'invalid'
        warning_name.innerHTML = 'Digite seu nome completo'
        return false
    } else if (regex.test(name)) {
        warning_name.innerHTML = ''
        warning_name.className = 'valid'
        return true
    } else {
        warning_name.className = 'missing'
        warning_name.innerHTML = 'Digite seu nome completo'
        return false
    }
}

// Validando nome da empresa
document.getElementById('inp_name_corp').addEventListener("keyup",valNameCorp)
function valNameCorp() {
    let name = document.getElementById('inp_name_corp').value

    // Validando a quantidade de palavra e caracteres
    if (name == '') {
        warning_name_corp.className = 'invalid'
        warning_name_corp.innerHTML = 'Digite o nome da empresa'
        return false
    }

    warning_name_corp.innerHTML = ''
    warning_name_corp.className = 'valid'
    return true
}

// Validando CNPJ
document.getElementById('inp_cnpj').addEventListener("keyup",valCnpj)
function valCnpj() {
    let cnpj = document.getElementById('inp_cnpj').value;
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') {
        warning_cnpj.className = 'invalid'
        warning_cnpj.innerHTML = 'Digite um CNPJ válido'
        return false;
    }

    if (cnpj.length != 14) {
        warning_cnpj.className = 'missing'
        warning_cnpj.innerHTML = 'Digite um CNPJ válido'
        return false;
    }
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {

        warning_cnpj.className = 'invalid'
        warning_cnpj.innerHTML = 'CNPJ inválido'
        return false;
    }

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) {
        warning_cnpj.className = 'invalid'
        warning_cnpj.innerHTML = 'CNPJ inválido'
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1)) {
        warning_cnpj.className = 'invalid'
        warning_cnpj.innerHTML = 'Digite um CNPJ válido'
        return false;
    } else {
        warning_cnpj.className = 'valid'
        warning_cnpj.innerHTML = ''
        return true;
    }
}

document.getElementById('btn-next').addEventListener("click", valNext)
function valNext() {
    if (!valName() | !valEmail() | !passCheck() | !valPass()) {
        return false
    }

    document.getElementById('register_1').style.display = 'none'
    document.getElementById('register_2').style.display = 'flex'
    document.getElementById('btn-next').innerHTML = 'CADASTRAR'
    document.getElementById('btn-next').setAttribute('onclick', "registerCheck()")
    document.getElementById('btn-prev').style.display = 'inline-block'
    return true
}

document.getElementById('btn-prev').addEventListener("click", valPrev)
function valPrev() {
    document.getElementById('register_1').style.display = 'flex'
    document.getElementById('register_2').style.display = 'none'
    document.getElementById('btn-next').innerHTML = 'PRÓXIMO'
    document.getElementById('btn-next').setAttribute('onclick', "valNext()")
    document.getElementById('btn-prev').style.display = 'none'
}

function registerCheck() {
    if (!valCnpj() | !valNameCorp()) {
        return false
    } 
        cadastrar()
        return true
}

function cadastrar() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = inp_name.value;
    var emailVar = inp_email.value;
    var senhaVar = inp_pass.value;
    var nomeempresa = inp_name_corp.value;
    var cnpj = sessionStorage.EMPRESA_CNPJ;
    var cargo = 'Chefe'
    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
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
            nomeempresaServer: nomeempresa,
            cnpjServer: cnpj,
            cargoServer: cargo
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}