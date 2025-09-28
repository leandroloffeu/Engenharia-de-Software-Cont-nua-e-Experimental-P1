#!/usr/bin/env python3
"""
Script para atualizar a tabela HTML com dados reais dos artigos
"""

import json
import re
from pathlib import Path

def carregar_artigos(arquivo: str = "data/artigos_reais.json"):
    """Carrega os artigos do arquivo JSON"""
    try:
        with open(arquivo, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {arquivo}")
        return []
    except json.JSONDecodeError:
        print(f"❌ Erro ao decodificar JSON: {arquivo}")
        return []

def gerar_linhas_tabela(artigos):
    """Gera as linhas da tabela HTML a partir dos artigos"""
    linhas = []
    
    for artigo in artigos:
        # Formatar autores (pegar apenas os primeiros 2-3)
        autores = artigo["autores"].split(", ")
        if len(autores) > 2:
            autores_formatados = ", ".join(autores[:2]) + " et al."
        else:
            autores_formatados = artigo["autores"]
        
        # Adicionar país
        autores_com_pais = f"{autores_formatados} ({artigo['pais']})"
        
        # Formatar tipo de estudo
        tipo_estudo = artigo["tipo_estudo"]
        
        # Formatar foco (pegar apenas os primeiros 2-3 termos)
        foco = artigo["foco"].split(", ")
        if len(foco) > 2:
            foco_formatado = ", ".join(foco[:2])
        else:
            foco_formatado = artigo["foco"]
        
        # Truncar resultados se muito longos
        resultados = artigo["resultados"]
        if len(resultados) > 50:
            resultados = resultados[:47] + "..."
        
        # Gerar linha da tabela
        linha = f"""                                <tr>
                                    <td>{artigo['ano']}</td>
                                    <td>{autores_com_pais}</td>
                                    <td>{tipo_estudo}</td>
                                    <td>{foco_formatado}</td>
                                    <td>{resultados}</td>
                                </tr>"""
        
        linhas.append(linha)
    
    return linhas

def atualizar_tabela_html(arquivo_html: str = "index.html", arquivo_artigos: str = "data/artigos_reais.json"):
    """Atualiza a tabela HTML com dados reais"""
    
    # Carregar artigos
    artigos = carregar_artigos(arquivo_artigos)
    if not artigos:
        print("❌ Nenhum artigo encontrado para atualizar a tabela")
        return
    
    print(f"📚 Carregados {len(artigos)} artigos")
    
    # Ler arquivo HTML
    try:
        with open(arquivo_html, 'r', encoding='utf-8') as f:
            conteudo_html = f.read()
    except FileNotFoundError:
        print(f"❌ Arquivo HTML não encontrado: {arquivo_html}")
        return
    
    # Gerar linhas da tabela
    linhas_tabela = gerar_linhas_tabela(artigos)
    
    # Encontrar a seção tbody da tabela
    padrao_tbody = r'(<tbody>)(.*?)(</tbody>)'
    match = re.search(padrao_tbody, conteudo_html, re.DOTALL)
    
    if not match:
        print("❌ Seção tbody não encontrada no HTML")
        return
    
    # Substituir conteúdo do tbody
    novo_tbody = f"<tbody>\n{chr(10).join(linhas_tabela)}\n                            </tbody>"
    conteudo_atualizado = re.sub(padrao_tbody, novo_tbody, conteudo_html, flags=re.DOTALL)
    
    # Atualizar estatísticas do resumo
    anos = [artigo["ano"] for artigo in artigos]
    paises = list(set([artigo["pais"] for artigo in artigos]))
    tipos = list(set([artigo["tipo_estudo"] for artigo in artigos]))
    
    # Substituir estatísticas
    conteudo_atualizado = re.sub(
        r'<span class="summary-number">150\+</span>',
        f'<span class="summary-number">{len(artigos)}+</span>',
        conteudo_atualizado
    )
    
    conteudo_atualizado = re.sub(
        r'<span class="summary-number">25</span>',
        f'<span class="summary-number">{len(paises)}</span>',
        conteudo_atualizado
    )
    
    conteudo_atualizado = re.sub(
        r'<span class="summary-number">3</span>',
        f'<span class="summary-number">{len(tipos)}</span>',
        conteudo_atualizado
    )
    
    conteudo_atualizado = re.sub(
        r'<span class="summary-number">8</span>',
        f'<span class="summary-number">{max(anos) - min(anos) + 1}</span>',
        conteudo_atualizado
    )
    
    # Salvar arquivo atualizado
    try:
        with open(arquivo_html, 'w', encoding='utf-8') as f:
            f.write(conteudo_atualizado)
        
        print(f"✅ Tabela HTML atualizada com sucesso!")
        print(f"📊 {len(artigos)} artigos inseridos na tabela")
        print(f"🌍 {len(paises)} países representados")
        print(f"🔬 {len(tipos)} tipos de estudo")
        print(f"📅 Período: {min(anos)}-{max(anos)}")
        
    except Exception as e:
        print(f"❌ Erro ao salvar arquivo: {e}")

def gerar_relatorio_detalhado(arquivo_artigos: str = "data/artigos_reais.json"):
    """Gera relatório detalhado dos artigos"""
    artigos = carregar_artigos(arquivo_artigos)
    if not artigos:
        return
    
    print("\n📊 RELATÓRIO DETALHADO DOS ARTIGOS")
    print("=" * 50)
    
    # Estatísticas por ano
    anos_count = {}
    for artigo in artigos:
        ano = artigo["ano"]
        anos_count[ano] = anos_count.get(ano, 0) + 1
    
    print("📈 Distribuição por ano:")
    for ano in sorted(anos_count.keys()):
        print(f"  {ano}: {anos_count[ano]} artigos")
    
    # Estatísticas por país
    paises_count = {}
    for artigo in artigos:
        pais = artigo["pais"]
        paises_count[pais] = paises_count.get(pais, 0) + 1
    
    print(f"\n🌍 Distribuição por país:")
    for pais, count in sorted(paises_count.items(), key=lambda x: x[1], reverse=True):
        print(f"  {pais}: {count} artigos")
    
    # Estatísticas por tipo de estudo
    tipos_count = {}
    for artigo in artigos:
        tipo = artigo["tipo_estudo"]
        tipos_count[tipo] = tipos_count.get(tipo, 0) + 1
    
    print(f"\n🔬 Distribuição por tipo de estudo:")
    for tipo, count in sorted(tipos_count.items(), key=lambda x: x[1], reverse=True):
        print(f"  {tipo}: {count} artigos")
    
    # Estatísticas por fonte
    fontes_count = {}
    for artigo in artigos:
        fonte = artigo["fonte"]
        fontes_count[fonte] = fontes_count.get(fonte, 0) + 1
    
    print(f"\n📖 Distribuição por fonte:")
    for fonte, count in sorted(fontes_count.items(), key=lambda x: x[1], reverse=True):
        print(f"  {fonte}: {count} artigos")

def main():
    """Função principal"""
    print("🔄 ATUALIZADOR DE TABELA HTML")
    print("Engenharia de Software Contínua e Experimental")
    print("=" * 60)
    
    # Atualizar tabela HTML
    atualizar_tabela_html()
    
    # Gerar relatório detalhado
    gerar_relatorio_detalhado()
    
    print(f"\n✅ Processo concluído com sucesso!")
    print(f"🌐 Acesse: http://localhost:8000")

if __name__ == "__main__":
    main()
