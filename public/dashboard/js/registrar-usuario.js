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

// Validando email
document.getElementById('inp_email').addEventListener("keyup", valEmail)
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
    }

    warning_email.className = 'missing'
    warning_email.innerHTML = 'Digite um email válido'
    return false
}

// Validando nome
document.getElementById('inp_name').addEventListener("keyup", valName)
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

// Validando cargo
document.getElementById('inp_name').addEventListener("keyup", valName)
function valPosition() {
    let position = document.getElementById('inp_name').value
    let regex = /^[a-z].* {1,}[a-z]{1,}/gi

    // Validando a quantidade de palavra e caracteres
    if (position == '') {
        warning_position.className = 'invalid'
        warning_position.innerHTML = 'Digite um cargo'
        return false
    }
    
    if (regex.test(position)) {
        warning_position.innerHTML = ''
        warning_position.className = 'valid'
        return true
    }

    if(position == "Dono" || position == "Chefe") {
        warning_position.className = 'missing'
        warning_position.innerHTML = 'Apenas quem fez o cadastro pode ter esse cargo'
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

function register() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    let nameVar = inp_name.value;
    let emailVar = inp_email.value;
    let passVar = inp_pass.value;
    let positionVar = inp_position.value;
    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nameServer: nameVar,
            emailServer: emailVar,
            passServer: passVar,
            positionServer: positionVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Funcionário cadastro com sucesso com sucesso!");
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}