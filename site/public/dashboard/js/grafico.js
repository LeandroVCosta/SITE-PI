 let proximaAtualizacao;

window.onload = obterDadosGrafico(5);

function alterarTitulo(idSensor) {
    var titulofazenda = document.getElementById("titulofazenda")
    titulofazenda.innerHTML = `AREA ${idSensor}`
}

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosG rafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico(idSensor) {
    alterarTitulo(idSensor)

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idSensor);
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
function plotarGrafico(resposta, idSensor) {
    console.log('iniciando plotagem do gráfico...');

    var dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-umidade',
                label: 'Umidade',
                borderColor: '#32B9CD',
                backgroundColor: '#32b9cd8f',
                fill: false,
                data: []
            },
            {
                yAxisID: 'y-temperatura',
                label: 'Temperatura',
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
                data: []
            }
        ]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.horario);
        dados.datasets[0].data.push(registro.Umidade);
        dados.datasets[1].data.push(registro.Temperatura);
    }

    console.log(JSON.stringify(dados));

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
                        max: 50,
                        min: 0
                    }
                }, {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    id: 'y-umidade',
                    ticks: {
                        beginAtZero: true,
                        max: 50,
                        min: 0
                    },

                    gridLines: {
                        drawOnChartArea: false,
                    },
                }],
            }
        }
    });

    setTimeout(() => atualizarGrafico(idSensor, dados), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idSensor, dados) {

    fetch(`/medidas/tempo-real/${idSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);

                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[0].horario); // incluir um novo momento
                
                dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                dados.datasets[0].data.push(novoRegistro[0].Umidade); // incluir uma nova medida de umidade
                
                dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                dados.datasets[1].data.push(novoRegistro[0].Temperatura); // incluir uma nova medida de temperatura

                window.grafico_linha.update();

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idSensor, dados), 2000);
                // IF PARA UMIDADE MODERADA
                if (novoRegistro[0].Umidade >= 30 || novoRegistro[0].Umidade <= 40) {
                    canvas_grafico.style.backgroundColor = `rgba(0, 155, 0, 0.1)`
                    alertaumi.style.color = 'green'
                    alertaumi.innerHTML = `IDEAL`
                // IF PARA UMIDADE EM ALERTA
                } if (novoRegistro[0].Umidade > 24 || novoRegistro[0].Umidade <= 27) {
                    canvas_grafico.style.backgroundColor = `rgba(255, 255, 0, 0.2)`
                    alertaumi.style.color = 'yellow'
                    alertaumi.innerHTML = `ALERTA!`
                }
                
                if (novoRegistro[0].Umidade > 40 || novoRegistro[0].Umidade < 43) {
                    canvas_grafico.style.backgroundColor = `rgba(255, 255, 0, 0.2)`
                    alertaumi.style.color = 'yellow'
                    alertaumi.innerHTML = `ALERTA!`
                }
                // IF PARA O ESTADO CRÍTICO!!!
                if (novoRegistro[0].Umidade <= 24 || novoRegistro[0].Umidade >= 44) {
                    canvas_grafico.style.backgroundColor = `rgba(155, 0, 0, 0.1)`
                    alertaumi.style.color = 'red'
                    alertaumi.innerHTML = `CRÍTICO!`
                }
                // IF PARA TEMPERATURA MODERADA

                if (novoRegistro[0].Temperatura >= 24 || novoRegistro[0].Temperatura <= 30){
                    canvas_grafico.style.backgroundColor = `rgba(0, 155, 0, 0.1)`
                    alertatemp.style.color = 'green'
                    alertatemp.innerHTML = `IDEAL`
                }
                // IF PARA TEMPERATURA EM ALERTA!
                if (novoRegistro[0].Temperatura > 22 || novoRegistro[0].Temperatura < 24){
                    canvas_grafico.style.backgroundColor = `rgba(255, 255, 0, 0.2)`
                    alertatemp.style.color = 'yellow'
                    alertatemp.innerHTML = `ALERTA!`
                }
                if (novoRegistro[0].Temperatura >= 31 || novoRegistro[0].Temperatura <= 32){
                    canvas_grafico.style.backgroundColor = `rgba(255, 255, 0, 0.2)`
                    alertatemp.style.color = 'yellow'
                    alertatemp.innerHTML = `ALERTA!`
                }
                // IF PARA TEMPERATURA CRÍTICA
                if (novoRegistro[0].Temperatura <= 22 || novoRegistro[0].Temperatura >= 32){
                    canvas_grafico.style.backgroundColor = `rgba(155, 0, 0, 0.1)`
                    alertatemp.style.color = 'red'
                    alertatemp.innerHTML = `CRÍTICO!`
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idSensor, dados), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}