/* INICIO - Carrosel */
var count = 1 

/*Essa linha está pegando a INPUT Radio1 e deixando ela selecionada*/
document.getElementById("radio1").checked=true; 
/*Da linha 4 até a 7 está colocando um intervalo para executar a função nextImagem()*/
setInterval(function () { 
    nextImagem();
}, 4000)

/*A função NextImagem() está aumentando em 1 a variável "count" e caso ela seja maior que 3, 
o count volta para 1. O numero do count determina qual carrosel será exibido. */
function nextImagem(){
    count++;
    if(count > 3){
        count = 1;
    }

    /*Aqui ele está pegando a palavra "radio" e concatenando com o "count" para assim dar o id do carrosel.*/
    let item = document.getElementById("radio" + count)
    item.checked = true

    // Mudando a cor da bolinha do carrosel ativo
    if (count == 1) {
        document.getElementsByClassName("manual-btn")[0].classList.add('active')
        document.getElementsByClassName("manual-btn")[1].classList.remove('active')
        document.getElementsByClassName("manual-btn")[2].classList.remove('active')
    }else if (count == 2) {

        document.getElementsByClassName("manual-btn")[0].classList.remove('active')
        document.getElementsByClassName("manual-btn")[1].classList.add('active')
        document.getElementsByClassName("manual-btn")[2].classList.remove('active')
    }else{

        document.getElementsByClassName("manual-btn")[0].classList.remove('active')
        document.getElementsByClassName("manual-btn")[1].classList.remove('active')
        document.getElementsByClassName("manual-btn")[2].classList.add('active')
    }
}

// Função para detectar o local do menu que foi clicado
const list = document.querySelectorAll('.manual-btn')

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'))
    this.classList.add('active')
}
list.forEach((item) =>
    item.addEventListener('click', activeLink))
/* FIM - Carrosel */
