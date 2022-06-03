// Função para revelar a senha
document.getElementById('img_ocultar').addEventListener("click", mostrar)
function mostrar() {

    if (inp_pass.type == "password") {
        img_ocultar.src = "img//utilizaveis/exibindo.png"
        inp_pass.type = "text"
    } else {
        img_ocultar.src = "img/utilizaveis/oculto.png"
        inp_pass.type = "password"
    }
}

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
    } else {
        warning_email.className = 'missing'
        warning_email.innerHTML = 'Digite um email válido'
        return false
    }
}

// Função para logar
function entrar() {
    var emailVar = inp_email.value;
    var senhaVar = inp_pass.value;

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.USUARIO_EMAIL = json.email;
                sessionStorage.USUARIO_NOME = json.nomeUsuario;
                sessionStorage.USUARIO_CARGO = json.cargo;
                sessionStorage.EMPRESA_CNPJ = json.cnpj;
                sessionStorage.ID_EMPRESA = json.fkEmpresa;

                setTimeout(function () {
                    window.location = "./dashboard/index.html";
                }, 1000); // apenas para exibir o loading

            });

        } 
    })
}
