// Função para detectar o local do menu que foi clicado
const list = document.querySelectorAll('.list')

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'))
    this.classList.add('active')
}
list.forEach((item) =>
    item.addEventListener('click', activeLink))