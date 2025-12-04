// Código para salvar e carregar times
let teams = JSON.parse(localStorage.getItem('teams')) || [];

// Função para finalizar e salvar o time
function finalizeTeam() {
  const teamName = document.getElementById('team-name').value;
  const players = [];
  document.querySelectorAll('.player-input').forEach(input => {
    const name = input.querySelector('input[name="player-name"]').value;
    const age = input.querySelector('input[name="player-age"]').value;
    if (name && age) {
      players.push({ name, age: parseInt(age) });
    }
  });

  if (teamName && players.length > 0) {
    // Verifica se é edição
    const editData = JSON.parse(localStorage.getItem('editTeam'));
    if (editData) {
      teams[editData.index] = { name: teamName, players };
      localStorage.removeItem('editTeam');
    } else {
      teams.push({ name: teamName, players });
    }

    localStorage.setItem('teams', JSON.stringify(teams));
    alert('Time finalizado e salvo!');
    window.location.href = 'times-list.html'; // Redireciona para a listagem
  } else {
    alert('Preencha o nome do time e pelo menos um jogador.');
  }
}

// Função para carregar dados de edição ao abrir a página
window.onload = function() {
  const editData = JSON.parse(localStorage.getItem('editTeam'));
  if (editData) {
    document.getElementById('team-name').value = editData.name;
    // Limpa jogadores existentes e adiciona os do time
    document.getElementById('players-list').innerHTML = '';
    editData.players.forEach(player => addPlayer(player.name, player.age));
    document.querySelector('.modify-btn').style.display = 'inline-block';
  }
  // Reutilize outras onload se houver
};