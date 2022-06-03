// Função para detectar o local do menu que foi clicado
// const list = document.querySelectorAll('.list')

// function activeLink() {
//     list.forEach((item) =>
//         item.classList.remove('active'))
//     this.classList.add('active')
// }
// list.forEach((item) =>
//     item.addEventListener('click', activeLink))


// // Sessões
// window.onload = validarSessao()
// function validarSessao() {
//     const email = sessionStorage.USUARIO_EMAIL
//     const nome = sessionStorage.USUARIO_NOME
//     const cargo = sessionStorage.USUARIO_CARGO
//     const cnpj = sessionStorage.EMPRESA_CNPJ

//     const span_user = document.getElementById("span_user")

    
//     if (email != null && nome != null && cargo != null && cnpj != null) {
//         span_user.innerHTML = nome;
//     } else {
//         window.location = "../login.html";
//         return
//     }

//     if (cargo != "Chefe" ) {
//         const registerUser = document.getElementById("register-user")
//         registerUser.parentNode.removeChild(registerUser)
//     }

// }

// document.getElementById("logout").addEventListener("click", limparSessao)
// function limparSessao() {
//     sessionStorage.clear();
//     window.location = "../login.html";
// }
