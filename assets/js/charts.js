// Gráficos com dados precisos dos artigos acadêmicos
document.addEventListener('DOMContentLoaded', function() {
    console.log('Charts.js carregado - versão com dados precisos');
    
    // Verificar se Chart.js está disponível
    if (typeof Chart === 'undefined') {
        console.error('Chart.js não está carregado!');
        return;
    }
    
    console.log('Chart.js disponível, inicializando gráficos...');
    
    // Configuração básica
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    Chart.defaults.color = '#2c3e50';
    
    // DADOS PRECISOS baseados na análise real dos 12 artigos
    const data = {
        temporal: {
            labels: ['2021', '2022', '2023'],
            datasets: [{
                label: 'Engenharia Contínua',
                data: [3, 4, 5],
                borderColor: '#3498db',
                backgroundColor: '#3498db20',
                tension: 0.4,
                fill: true
            }, {
                label: 'Engenharia Experimental',
                data: [3, 4, 5],
                borderColor: '#e74c3c',
                backgroundColor: '#e74c3c20',
                tension: 0.4,
                fill: true
            }]
        },
        studyTypes: {
            labels: ['Experimental Study', 'Systematic Review', 'Empirical Study', 'Survey', 'Case Study', 'Comparative Study'],
            data: [3, 2, 2, 2, 2, 1]
        },
        metrics: {
            labels: ['CI/CD', 'DevOps', 'Practices', 'Validation', 'Continuous Deployment', 'Microservices'],
            data: [4, 2, 2, 2, 2, 2]
        },
        countries: {
            labels: ['China', 'Estados Unidos', 'Brasil', 'Reino Unido', 'Coreia do Sul', 'Canadá', 'Alemanha', 'Índia', 'Espanha', 'Japão'],
            data: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
    };
    
    // Função para criar gráfico temporal
    function createTemporalChart() {
        const ctx = document.getElementById('temporalChart');
        if (!ctx) {
            console.error('Elemento temporalChart não encontrado');
            return;
        }
        
        console.log('Criando gráfico temporal com dados precisos...');
        
        new Chart(ctx, {
            type: 'line',
            data: data.temporal,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolução Temporal das Publicações (2021-2023)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Ano'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Artigos'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
        
        console.log('✅ Gráfico temporal criado com dados precisos');
    }
    
    // Função para criar gráfico de tipos de estudo
    function createStudyTypeChart() {
        const ctx = document.getElementById('studyTypeChart');
        if (!ctx) {
            console.error('Elemento studyTypeChart não encontrado');
            return;
        }
        
        console.log('Criando gráfico de tipos de estudo com dados precisos...');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.studyTypes.labels,
                datasets: [{
                    data: data.studyTypes.data,
                    backgroundColor: [
                        '#3498db',
                        '#e74c3c',
                        '#f39c12',
                        '#2ecc71',
                        '#9b59b6',
                        '#1abc9c'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribuição por Tipo de Estudo',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de tipos de estudo criado com dados precisos');
    }
    
    // Função para criar gráfico de métricas
    function createMetricsChart() {
        const ctx = document.getElementById('metricsChart');
        if (!ctx) {
            console.error('Elemento metricsChart não encontrado');
            return;
        }
        
        console.log('Criando gráfico de métricas com dados precisos...');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.metrics.labels,
                datasets: [{
                    label: 'Frequência de Menção',
                    data: data.metrics.data,
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Focos Mais Mencionados nos Artigos',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Menções'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Focos de Pesquisa'
                        }
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de métricas criado com dados precisos');
    }
    
    // Função para criar gráfico de países
    function createCountriesChart() {
        const ctx = document.getElementById('countriesChart');
        if (!ctx) {
            console.error('Elemento countriesChart não encontrado');
            return;
        }
        
        console.log('Criando gráfico de países com dados precisos...');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.countries.labels,
                datasets: [{
                    label: 'Número de Artigos',
                    data: data.countries.data,
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribuição por País (Top 10)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Países'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Artigos'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de países criado com dados precisos');
    }
    
    // Função para criar gráfico de introdução
    function createIntroChart() {
        const ctx = document.getElementById('introChart');
        if (!ctx) {
            console.log('Elemento introChart não encontrado (opcional)');
            return;
        }
        
        console.log('Criando gráfico de introdução com dados precisos...');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023'],
                datasets: [{
                    label: 'Total de Artigos',
                    data: [3, 4, 5],
                    borderColor: '#2ecc71',
                    backgroundColor: '#2ecc7120',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Crescimento das Publicações',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Ano'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Artigos'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de introdução criado com dados precisos');
    }
    
    // Inicializar todos os gráficos
    function initAllCharts() {
        console.log('Inicializando todos os gráficos com dados precisos...');
        
        // Verificar se os elementos existem
        const elements = [
            'temporalChart', 'studyTypeChart', 'metricsChart', 'countriesChart', 'introChart'
        ];
        
        let elementsFound = 0;
        elements.forEach(id => {
            if (document.getElementById(id)) {
                elementsFound++;
                console.log(`✅ Elemento ${id} encontrado`);
            } else {
                console.log(`❌ Elemento ${id} não encontrado`);
            }
        });
        
        console.log(`Elementos encontrados: ${elementsFound}/${elements.length}`);
        
        if (elementsFound > 0) {
            createTemporalChart();
            createStudyTypeChart();
            createMetricsChart();
            createCountriesChart();
            createIntroChart();
            console.log('✅ Todos os gráficos inicializados com dados precisos');
        } else {
            console.log('Nenhum elemento de gráfico encontrado, tentando novamente em 1 segundo...');
            setTimeout(initAllCharts, 1000); // Retry after 1 second
        }
    }
    
    // Aguardar um pouco para garantir que o DOM está pronto
    setTimeout(initAllCharts, 500);
    
    // Também tentar inicializar quando a página estiver completamente carregada
    window.addEventListener('load', function() {
        console.log('Página completamente carregada, tentando inicializar gráficos...');
        setTimeout(initAllCharts, 200);
    });
});