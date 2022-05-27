// Função para revelar a senha
function mostrar() {

    if (in_senha.type == "password") {
        img_ocultar.src = "img//utilizaveis/exibindo.png"
        in_senha.type = "text"
        in_senha2.type = "text"
    } else {
        img_ocultar.src = "img/utilizaveis/oculto.png"
        in_senha.type = "password"
        in_senha2.type = "password"
    }
}
// fim da função
var btnNext = document.getElementById("btn-next")
var btnBack = document.getElementById("btn-back")

btnNext.addEventListener("click", next)
function next() {
    let cadastro1 = document.getElementById("cadastro1")
    let cadastro2 = document.getElementById("cadastro2")
    
    cadastro1.style.display = "none"
    cadastro2.style.display = "flex"
    btnNext.innerHTML = "Cadastrar"
}

btnBack.addEventListener("click", back)
function back() {
    let cadastro1 = document.getElementById("cadastro1")
    let cadastro2 = document.getElementById("cadastro2")

    cadastro2.style.display = "none"
    cadastro1.style.display = "flex"
    btnBack.innerHTML = "Voltar"
}