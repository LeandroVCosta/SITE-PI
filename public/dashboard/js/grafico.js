// Vetor

var farmListId = document.getElementById("farm_list")
// Número identificador (id) da fazenda
var farm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
// Número identificador (id) da área
var area = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// Classes (css) de status da fazenda
var farmStatus = ['critico', 'moderado', 'controlado']

// Criando os gráficos e tabelas ao carregar página
farmListId.addEventListener('load', listFarm())
function listFarm() {
    // Criando a seleção das fazendas
    let farmPosicao = farm.length - 1
    for (let i = 0; i <= farmPosicao; i++) {
        let status = parseInt(Math.random() * 3); // Gerando o status aleatóriamente
        // let status = i % 3;
        let farmList = document.getElementById("farm_list")
        farmList.insertAdjacentHTML("beforeEnd", `
            <article id='${farm[i]}' class="farm ${farmStatus[status]}">
                <div class="farm-posicao">
                    <h1>Fazenda ${farm[i]}</h1>
                    <img src="../img/sistema/svg/down-arrow.svg">
                </div>
            </article>
        `)
    }

    // Exibindo o gráfico da fazenda da posição 0
    setTimeout(() => {
        document.getElementById(farm[0]).click(chartGen)
    }, 0);
}

// Alterar os dados dos gráficos e tabelas ao selecionar fazenda
farmListId.addEventListener('click', chartGen)
function chartGen(farmId) {
    let farmConteudoId = document.getElementById("farm_conteudo")
    let farmTabelaId = document.getElementById("farm_tabela")
    // Redefinindo gráficos
    farmConteudoId.innerHTML = `
    <section id="dashboard${farmId.target.id}">
        <h2>Fazenda ${farmId.target.id}</h2>
        <section class="dash-container">
            <article class="fill">
                <div style="position: relative; height:93.5%; width:100%">
                    <canvas id="chart_1" width="1200" height="281"></canvas>
                </div>
            </article>
        </section>

        <section class="dash-container">
            <article class="box">
                <div style="position: relative; height:93.5%; width:100%">
                    <canvas id="chart_2" width="100%" height="40"></canvas>
                </div>
            </article>

            <article class="box">
                <div style="position: relative; height:93.5%; width:100%">
                    <canvas id="chart_3" width="100%" height="40"></canvas>
                </div>
            </article>
        </section>
    </section>
    `
    // Redefinindo tabelas
    farmTabelaId.innerHTML = ` 
        <!-- Tabela das áreas mais instáveis -->
        <article class="box">
            <h2 class="critico">
                Locais menos estáveis
            </h2>
            <table>
                <tbody id="table_instavel">
                    <tr class="critico">
                        <th>Área</th>
                        <th>Temperatura</th>
                        <th>Umidade</th>
                        <th>Status</th>
                    </tr>
                </tbody>
            </table>
        </article>

        <!-- Tabela das áreas mais estáveis -->
        <article class="box">
            <h2 class="controlado">
                Locais mais estáveis
            </h2>
            <table>
                <tbody id="table_estavel">
                    <tr class="controlado">
                        <th>Área</th>
                        <th>Temperatura</th>
                        <th>Umidade</th>
                        <th>Status</th>
                    </tr>
                </tbody>
            </table>
        </article>
    </section> 
    `
    grafico1()
    grafico2()
    grafico3()
    tabelas()
}
// Gráficos

function tabelas() {
    // Criando a tabela dos locais mais estáveis
    let farmTable1 = document.getElementById("table_estavel")
    for (let i = 0; i < area.length; i++) {
        let status = parseInt(Math.random() * 3); // Gerando o status aleatóriamente
        // let status = i % 3;
        farmTable1.insertAdjacentHTML("beforeEnd", `
                <tr class="${farmStatus[status]}">
                    <td>Área ${area[i]}</td>
                    <td>13</td>
                    <td>13</td>
                    <td style="text-transform: capitalize;" >${farmStatus[status]}</td>
                </tr>
        `)
    }

    // Criando a tabela dos locais mais instáveis
    let farmTable2 = document.getElementById("table_instavel")
    for (let i = 0; i < area.length; i++) {
        // Tabela dos locais mais perto do crítico
        let status = parseInt(Math.random() * 3); // Gerando o status aleatóriamente
        // let status = i % 3;
        farmTable2.insertAdjacentHTML("beforeEnd", `
                <tr class="${farmStatus[status]}">
                    <td>Área ${area[i]}</td>
                    <td>13</td>
                    <td>13</td>
                    <td style="text-transform: capitalize;" >${farmStatus[status]}</td>
                </tr>
        `)
    }
}

// Primeiro gráfico - Linha : Decidir o que terá
function grafico1() {
    let chart = document.getElementById('chart_1').getContext('2d');

    // Dados para testes
    let umidade = []
    let label = []
    let limit = parseInt(Math.random() * 4) + 3

    for (let i = 1; i <= limit; i++) {
        umidade.push(parseInt(Math.random() * 99) + 1)
        label.push('Área ' + i)
    }

    let chartConfig = new Chart(chart, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: 'Umidade',
                data: umidade,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Segundo gráfico - Barra : Decidir o que terá
function grafico2() {
    let chart = document.getElementById('chart_2').getContext('2d');
    // Dados para testes
    let umidade = []
    let label = []
    let limit = parseInt(Math.random() * 3) + 2

    for (let i = 1; i <= limit; i++) {
        umidade.push(parseInt(Math.random() * 99) + 1)
        label.push('Área '+i)
    }

    let chartConfig = new Chart(chart, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Umidade',
                data: umidade,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// Terceiro gráfico - Misto : Decidir o que terá
function grafico3() {
    let chart = document.getElementById('chart_3').getContext('2d');
    // Dados para testes
    let umidade = []
    let temperatura = []
    let label = []
    let limit = parseInt(Math.random() * 3) + 2

    for (let i = 1; i <= limit; i++) {
        umidade.push(parseInt(Math.random() * 99)+1)
        temperatura.push(parseInt(Math.random() * 44)+1)
        label.push('Área '+i)
    }

    let chartConfig = new Chart(chart, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Temperatura',
                data: temperatura,
                // this dataset is drawn below
                order: 2,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Umidade',
                data: umidade,
                type: 'line',
                // this dataset is drawn on top
                order: 1,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    '#74025c'
                ],
                borderWidth: 2
            }],
            labels: label
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
