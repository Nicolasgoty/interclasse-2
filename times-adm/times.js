// Debug: Verificar se o JS está carregando
      console.log("JavaScript carregado com sucesso!");

      // Código para o menu lateral
      const menuBtn = document.getElementById("menuBtn");
      const menu = document.getElementById("menu-lateral");

      if (menuBtn && menu) {
        console.log("Elementos do menu encontrados.");
        menuBtn.addEventListener("click", () => {
          console.log("Botão do menu clicado.");
          const open = menu.classList.toggle("open");
          menu.setAttribute("aria-hidden", String(!open));
          console.log("Menu aberto:", open);
        });
      } else {
        console.error("Erro: Elementos do menu não encontrados. Verifique IDs no HTML.");
      }

      function showToast() {
        const t = document.getElementById("toast");
        t.classList.add("show");
        clearTimeout(t._hide);
        t._hide = setTimeout(() => t.classList.remove("show"), 1200);
      }

      function addRipple(e) {
        const el = e.currentTarget;
        const r = document.createElement("span");
        r.className = "ripple";
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.width = r.style.height = size + "px";
        r.style.left = e.clientX - rect.left - size / 2 + "px";
        r.style.top = e.clientY - rect.top - size / 2 + "px";
        el.appendChild(r);
        setTimeout(() => r.remove(), 600);
      }

      document.querySelectorAll("[data-target]").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          addRipple(e);
          showToast();
          const t = this.getAttribute("data-target");
          setTimeout(() => (location.href = t), 700);
        });
      });

      // Código para IndexedDB (banco de dados local)
      let db;
      const dbName = 'TeamsDB';
      const storeName = 'teams';

      function initDB() {
        const request = indexedDB.open(dbName, 1);
        request.onerror = () => console.error('Erro ao abrir IndexedDB');
        request.onsuccess = (event) => {
          db = event.target.result;
          loadTeams();
        };
        request.onupgradeneeded = (event) => {
          db = event.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            store.createIndex('name', 'name', { unique: true });
          }
        };
      }

      function addTeam(name) {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add({ name });
        request.onsuccess = () => loadTeams();
        request.onerror = () => alert('Erro ao adicionar time ou time já existe!');
      }

      function removeTeam(id) {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);
        request.onsuccess = () => loadTeams();
        request.onerror = () => console.error('Erro ao remover time');
      }

      function loadTeams() {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = (event) => {
          const teams = event.target.result;
          updateTeamList(teams);
        };
      }

      function updateTeamList(teams) {
        const teamList = document.getElementById('teamList');
        teamList.innerHTML = '';
        teams.forEach((team) => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = `${team.name.toLowerCase().replace(/\s+/g, '')}.html`;
          link.textContent = team.name;
          
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Remover';
          deleteBtn.className = 'delete-btn';
          deleteBtn.addEventListener('click', () => removeTeam(team.id));
          
          li.appendChild(link);
          li.appendChild(deleteBtn);
          teamList.appendChild(li);
        });
      }

      document.getElementById('teamForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const teamName = document.getElementById('teamName').value.trim();
        if (teamName) {
          addTeam(teamName);
          document.getElementById('teamName').value = '';
        }
      });

      initDB();