/* VARIÁVEL */
let count = 1 
/*Essa linha está pegando a INPUT Radio1 e deixando ela "ticada"*/
document.getElementById("radio1").checked=true; 
/*Da linha 4 até a 7 está colocando
 um interválo para executar a função nextImagem()*/
setInterval(function () { 
    nextImagem();
}, 6000)
/*A função NextImagem() está aumentando em 1 a variável "count" e caso ela seja maior que 3, 
o count volta para 1, o numero do count determina qual carrosel será exibido. */
function nextImagem(){
    count++;
    if(count > 3){
        count = 1;
    }

    /*Aqui ele está pegando a palavra "radio" e concatenando com o "count" para assim dar o id do carrosel.*/
    document.getElementById("radio" + count).checked = true;
}

