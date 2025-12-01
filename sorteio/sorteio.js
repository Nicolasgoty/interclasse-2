function sortearJogos() {
            const times = [];
            for (let i = 1; i <= 10; i++) {
                const time = document.getElementById(`time${i}`).value.trim();
                if (time) times.push(time);
            }
            
            if (times.length < 10) {
                alert('Por favor, insira os nomes de todos os 10 times.');
                return;
            }
            
            // Embaralhar os times
            const timesEmbaralhados = [...times].sort(() => Math.random() - 0.5);
            
            // Criar 5 jogos (pares aleatórios)
            const jogos = [];
            for (let i = 0; i < 5; i++) {
                const time1 = timesEmbaralhados[i * 2];
                const time2 = timesEmbaralhados[i * 2 + 1];
                jogos.push({
                    id: i + 1,
                    time1: time1,
                    time2: time2,
                    placar1: 0,
                    placar2: 0,
                    jogadores: [],
                    status: 'Não iniciado'
                });
            }
            
            // Salvar no LocalStorage
            localStorage.setItem('jogosSorteados', JSON.stringify(jogos));
            
            // Exibir resultados
            const resultadosDiv = document.getElementById('resultados');
            resultadosDiv.innerHTML = '<h2>Jogos Sorteados:</h2>';
            jogos.forEach(jogo => {
                resultadosDiv.innerHTML += `<p>Jogo ${jogo.id}: ${jogo.time1} vs ${jogo.time2}</p>`;
            });
            resultadosDiv.innerHTML += '<br><button onclick="location.href=\'editar-jogos.html\'">Editar Estatísticas dos Jogos</button>';
            resultadosDiv.innerHTML += '<br><button onclick="location.href=\'resultados-tempo-real.html\'">Ver Resultados em Tempo Real</button>';
        }