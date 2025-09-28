#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor local para visualizar o trabalho acadêmico web.
Execute este script para iniciar um servidor local.

Autor: [Seu Nome]
Data: 2025
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def start_server(port=8000):
    """Inicia o servidor local."""
    # Verificar se o arquivo index.html existe
    if not Path("index.html").exists():
        print("❌ ERRO: Arquivo index.html não encontrado!")
        print("   Certifique-se de estar no diretório correto.")
        return False
    
    # Configurar o servidor
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print("🚀 SERVIDOR LOCAL INICIADO")
            print("=" * 50)
            print(f"📡 Porta: {port}")
            print(f"🌐 URL: http://localhost:{port}")
            print(f"📁 Diretório: {os.getcwd()}")
            print("=" * 50)
            print("💡 Pressione Ctrl+C para parar o servidor")
            print()
            
            # Abrir o navegador automaticamente
            try:
                webbrowser.open(f"http://localhost:{port}")
                print("✅ Navegador aberto automaticamente")
            except:
                print("⚠️  Abra manualmente: http://localhost:{port}")
            
            print()
            
            # Iniciar o servidor
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ ERRO: Porta {port} já está em uso!")
            print(f"   Tente uma porta diferente: python start_server.py {port + 1}")
        else:
            print(f"❌ ERRO: {e}")
        return False
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor interrompido pelo usuário")
        print("👋 Até logo!")
        return True

def main():
    """Função principal."""
    print("🎓 TRABALHO ACADÊMICO - SERVIDOR LOCAL")
    print("   Engenharia de Software Contínua e Experimental")
    print("=" * 60)
    
    # Verificar argumentos da linha de comando
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ ERRO: Porta inválida!")
            print("   Uso: python start_server.py [porta]")
            return
    
    # Verificar se Python 3 está sendo usado
    if sys.version_info[0] < 3:
        print("❌ ERRO: Python 3 é necessário!")
        print("   Use: python3 start_server.py")
        return
    
    # Iniciar servidor
    success = start_server(port)
    
    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()
