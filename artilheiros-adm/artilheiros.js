

        // Função para salvar dados no LocalStorage
        function salvarDados(dados) {
            localStorage.setItem('jogadores', JSON.stringify(dados));
        }

        // Função para adicionar jogador
        function adicionarJogador() {
            const nome = document.getElementById('nome').value;
            const gols = parseInt(document.getElementById('gols').value) || 0;
            const assistencias = parseInt(document.getElementById('assistencias').value) || 0;
            const somatoria = gols + assistencias;

            if (nome.trim() === '') {
                alert('Por favor, insira o nome do jogador.');
                return;
            }

            // Carregar dados existentes
            const dados = JSON.parse(localStorage.getItem('jogadores')) || [];
            
            // Adicionar novo jogador
            dados.push({ nome, gols, assistencias, somatoria });
            
            // Salvar no LocalStorage
            salvarDados(dados);
            
            // Recarregar tabela
            carregarDados();

            // Limpar campos
            document.getElementById('nome').value = '';
            document.getElementById('gols').value = '';
            document.getElementById('assistencias').value = '';
        }

        // Carregar dados ao iniciar a página
        window.onload = carregarDados;
  