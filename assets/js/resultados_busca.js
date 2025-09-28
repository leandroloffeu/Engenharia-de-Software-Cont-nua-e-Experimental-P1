/**
 * JavaScript para página de resultados da busca acadêmica
 * Carrega e exibe dados dos artigos encontrados
 */

let artigosData = [];

// Carregar dados dos artigos
async function carregarDadosArtigos() {
    try {
        const response = await fetch('data/artigos_reais.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        artigosData = await response.json();
        console.log('✅ Dados dos artigos carregados:', artigosData.length);
        
        // Atualizar interface
        atualizarEstatisticas();
        preencherTabela();
        criarGraficos();
        gerarAnalises();
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        mostrarErro('Erro ao carregar dados dos artigos');
    }
}

// Atualizar estatísticas no cabeçalho
function atualizarEstatisticas() {
    if (!artigosData.length) return;
    
    const anos = [...new Set(artigosData.map(a => a.ano))];
    const paises = [...new Set(artigosData.map(a => a.pais))];
    const tipos = [...new Set(artigosData.map(a => a.tipo_estudo))];
    const fontes = [...new Set(artigosData.map(a => a.fonte))];
    
    // As estatísticas já estão hardcoded no HTML, mas podemos atualizar se necessário
    console.log(`Estatísticas: ${artigosData.length} artigos, ${paises.length} países, ${tipos.length} tipos, ${fontes.length} fontes`);
}

// Preencher tabela com dados dos artigos
function preencherTabela() {
    const tbody = document.getElementById('tabela-artigos');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    artigosData.forEach(artigo => {
        const row = document.createElement('tr');
        
        // Formatar autores
        const autores = artigo.autores.split(', ');
        const autoresFormatados = autores.length > 2 
            ? `${autores.slice(0, 2).join(', ')} et al.` 
            : artigo.autores;
        
        // Formatar foco
        const foco = artigo.foco.split(', ');
        const focoFormatado = foco.length > 2 
            ? foco.slice(0, 2).join(', ') 
            : artigo.foco;
        
        // Truncar resultados
        const resultados = artigo.resultados.length > 50 
            ? artigo.resultados.substring(0, 47) + '...' 
            : artigo.resultados;
        
        row.innerHTML = `
            <td>${artigo.ano}</td>
            <td>${autoresFormatados} (${artigo.pais})</td>
            <td>${artigo.tipo_estudo}</td>
            <td>${focoFormatado}</td>
            <td>${resultados}</td>
            <td>${artigo.fonte}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Criar gráficos de análise
function criarGraficos() {
    if (!artigosData.length) return;
    
    criarGraficoAnos();
    criarGraficoPaises();
    criarGraficoTipos();
    criarGraficoFontes();
}

// Gráfico de distribuição por ano
function criarGraficoAnos() {
    const ctx = document.getElementById('anoChart');
    if (!ctx) return;
    
    const anos = {};
    artigosData.forEach(artigo => {
        anos[artigo.ano] = (anos[artigo.ano] || 0) + 1;
    });
    
    const labels = Object.keys(anos).sort();
    const data = labels.map(ano => anos[ano]);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Artigos por Ano',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução Temporal das Publicações'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Gráfico de distribuição por país
function criarGraficoPaises() {
    const ctx = document.getElementById('paisChart');
    if (!ctx) return;
    
    const paises = {};
    artigosData.forEach(artigo => {
        paises[artigo.pais] = (paises[artigo.pais] || 0) + 1;
    });
    
    // Ordenar por quantidade e pegar top 8
    const paisesOrdenados = Object.entries(paises)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8);
    
    const labels = paisesOrdenados.map(([pais]) => pais);
    const data = paisesOrdenados.map(([, count]) => count);
    
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Artigos por País',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 8 Países por Publicações'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Gráfico de tipos de estudo
function criarGraficoTipos() {
    const ctx = document.getElementById('tipoChart');
    if (!ctx) return;
    
    const tipos = {};
    artigosData.forEach(artigo => {
        tipos[artigo.tipo_estudo] = (tipos[artigo.tipo_estudo] || 0) + 1;
    });
    
    const labels = Object.keys(tipos);
    const data = Object.values(tipos);
    const colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
    ];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição por Tipo de Estudo'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Gráfico de fontes
function criarGraficoFontes() {
    const ctx = document.getElementById('fonteChart');
    if (!ctx) return;
    
    const fontes = {};
    artigosData.forEach(artigo => {
        fontes[artigo.fonte] = (fontes[artigo.fonte] || 0) + 1;
    });
    
    const labels = Object.keys(fontes);
    const data = Object.values(fontes);
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição por Fonte'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Gerar análises detalhadas
function gerarAnalises() {
    if (!artigosData.length) return;
    
    gerarAnaliseTemporal();
    gerarAnaliseGeografica();
    gerarAnaliseMetodologica();
    gerarAnaliseDescobertas();
}

// Análise temporal
function gerarAnaliseTemporal() {
    const anos = artigosData.map(a => a.ano).sort();
    const anoInicio = Math.min(...anos);
    const anoFim = Math.max(...anos);
    const crescimento = artigosData.filter(a => a.ano === anoFim).length;
    
    const texto = `A análise temporal mostra um crescimento consistente nas publicações de ${anoInicio} a ${anoFim}. 
    O ano de ${anoFim} apresentou ${crescimento} artigos, indicando um interesse crescente na área. 
    A tendência sugere que o tema está ganhando relevância na comunidade acadêmica, com foco especial 
    em práticas de CI/CD e métodos experimentais de validação.`;
    
    document.getElementById('analise-temporal').textContent = texto;
}

// Análise geográfica
function gerarAnaliseGeografica() {
    const paises = {};
    artigosData.forEach(artigo => {
        paises[artigo.pais] = (paises[artigo.pais] || 0) + 1;
    });
    
    const paisLider = Object.entries(paises).sort(([,a], [,b]) => b - a)[0];
    const totalPaises = Object.keys(paises).length;
    
    const texto = `A distribuição geográfica abrange ${totalPaises} países, com ${paisLider[0]} liderando 
    com ${paisLider[1]} publicações. A diversidade geográfica indica que o tema é de interesse global, 
    com contribuições de diferentes contextos culturais e organizacionais.`;
    
    document.getElementById('analise-geografica').textContent = texto;
}

// Análise metodológica
function gerarAnaliseMetodologica() {
    const tipos = {};
    artigosData.forEach(artigo => {
        tipos[artigo.tipo_estudo] = (tipos[artigo.tipo_estudo] || 0) + 1;
    });
    
    const tipoPrincipal = Object.entries(tipos).sort(([,a], [,b]) => b - a)[0];
    const totalTipos = Object.keys(tipos).length;
    
    const texto = `Foram identificados ${totalTipos} tipos diferentes de estudos, com ${tipoPrincipal[0]} 
    sendo o mais comum (${tipoPrincipal[1]} artigos). A diversidade metodológica indica uma abordagem 
    multidisciplinar, combinando estudos experimentais, surveys e estudos de caso.`;
    
    document.getElementById('analise-metodologica').textContent = texto;
}

// Análise de descobertas
function gerarAnaliseDescobertas() {
    const focos = {};
    artigosData.forEach(artigo => {
        const focosArtigo = artigo.foco.split(', ');
        focosArtigo.forEach(foco => {
            focos[foco.trim()] = (focos[foco.trim()] || 0) + 1;
        });
    });
    
    const focoPrincipal = Object.entries(focos).sort(([,a], [,b]) => b - a)[0];
    
    const texto = `As principais descobertas indicam que ${focoPrincipal[0]} é o foco mais estudado 
    (${focoPrincipal[1]} menções). Os resultados mostram melhorias significativas em produtividade, 
    qualidade e confiabilidade quando práticas de engenharia contínua são implementadas adequadamente.`;
    
    document.getElementById('analise-descobertas').textContent = texto;
}

// Mostrar erro
function mostrarErro(mensagem) {
    const container = document.querySelector('.main-content');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <h2>❌ Erro</h2>
                <p>${mensagem}</p>
                <button onclick="location.reload()" class="btn btn-primary">Tentar Novamente</button>
            </div>
        `;
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando página de resultados...');
    carregarDadosArtigos();
});

// Adicionar estilos para mensagem de erro
const style = document.createElement('style');
style.textContent = `
    .error-message {
        text-align: center;
        padding: 4rem 2rem;
        background: var(--white);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        margin: 2rem;
    }
    
    .error-message h2 {
        color: var(--danger-color, #e74c3c);
        margin-bottom: 1rem;
    }
    
    .search-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .summary-card {
        background: var(--white);
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .summary-card h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .summary-card ul {
        list-style: none;
        padding: 0;
    }
    
    .summary-card li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--light-bg);
    }
    
    .summary-card li:last-child {
        border-bottom: none;
    }
    
    .analysis-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .analysis-card {
        background: var(--white);
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }
    
    .analysis-card h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);
