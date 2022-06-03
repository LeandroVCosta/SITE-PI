let farmListId = document.getElementById("farm_list")
// Número identificador (id) da fazenda
const farm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
// Número identificador (id) da área
const area = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// Classes (css) de status da fazenda
const farmStatus = ['critico', 'moderado', 'controlado']
const idSensor = 1

// Criando os gráficos e tabelas ao carregar página
farmListId.addEventListener('load', listFarm())
function listFarm() {
    // Criando a seleção das fazendas
    const farmPosicao = farm.length - 1
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
function chartGen(idFazenda) {
    let farmConteudoId = document.getElementById("farm_conteudo")
    let farmTabelaId = document.getElementById("farm_tabela")
    // Redefinindo gráficos
    farmConteudoId.innerHTML = `
    <section id="dashboard${idFazenda.target.id}">
        <h2>Fazenda ${idFazenda.target.id}</h2>
        <section class="dash-container">
            <article class="fill">
                <div style="position: relative; height:93.5%; width:100%">
                    <canvas id="canvas_grafico" width="1200" height="281"></canvas>
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
    // grafico1()
    obterDadosGrafico(1);
    grafico2()
    grafico3()
    tabelas()
}
// Gráficos

function tabelas() {
    // Criando a tabela dos locais mais estáveis
    const farmTable1 = document.getElementById("table_estavel")
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
    const farmTable2 = document.getElementById("table_instavel")
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
    // const chart = document.getElementById('chart_1').getContext('2d')

    // Dados para testes
    let umidade = []
    let label = []
    const limit = parseInt(Math.random() * 4) + 3

    for (let i = 1; i <= limit; i++) {
        umidade.push(parseInt(Math.random() * 99) + 1)
        label.push('Área ' + i)
    }

    const chartConfig = new Chart(chart, {
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
            },
        }
    });
}

// Segundo gráfico - Barra : Decidir o que terá
function grafico2() {
    const chart = document.getElementById('chart_2').getContext('2d');
    // Dados para testes
    let umidade = []
    let label = []
    const limit = parseInt(Math.random() * 3) + 2

    for (let i = 1; i <= limit; i++) {
        umidade.push(parseInt(Math.random() * 99) + 1)
        label.push('Área ' + i)
    }

    const chartConfig = new Chart(chart, {
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
            },
        }
    });
}

// Terceiro gráfico - Misto : Decidir o que terá
function grafico3() {
    const chart = document.getElementById('chart_3').getContext('2d');
    // Dados para testes
    let umidade = []
    let temperatura = []
    let label = []
    const limit = parseInt(Math.random() * 3) + 2

    for (let i = 1; i <= limit; i++) {
        umidade.push(parseInt(Math.random() * 99) + 1)
        temperatura.push(parseInt(Math.random() * 44) + 1)
        label.push('Área ' + i)
    }

    const chartConfig = new Chart(chart, {
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

// Atualizando gráficos em tempo real
let proximaAtualizacao;


// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico(fkSensor) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${fkSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            console.log("Obtendo dados: Resposta Ok")
            
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log("Indo plotar gráfico")
                plotarGrafico(resposta, fkSensor);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, fkSensor) {
    console.log('iniciando plotagem do gráfico...');

    var dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-umidade',
                label: 'Umidade',
                borderColor: '#32B9CD',
                backgroundColor: '#32b9cd8f',
                fill: true,
                data: []
            },
            {
                yAxisID: 'y-temperatura',
                label: 'Temperatura',
                borderColor: '#FFF',
                backgroundColor: '#32b9cd8f',
                fill: true,
                data: []
            }
        ]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.horario);
        dados.datasets[0].data.push(registro.umidade);
        dados.datasets[1].data.push(registro.temperatura);
    }

    console.log(JSON.stringify(dados));


    // const chart = document.getElementById('chart_1').getContext('2d')
    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        options: {
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-temperatura',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    }
                }, {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    id: 'y-umidade',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    },

                    gridLines: {
                        drawOnChartArea: false,
                    },
                }],
            }
        }
    });
    console.log("Plotando gráfico =)")

    setTimeout(() => atualizarGrafico(fkSensor, dados), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(fkSensor, dados) {
    // console.log("Indo atualizar gráfico")

    fetch(`/medidas/tempo-real/${fkSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);

                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[0].horario); // incluir um novo momento

                dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                window.grafico_linha.update();

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(fkSensor, dados), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(fkSensor, dados), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}