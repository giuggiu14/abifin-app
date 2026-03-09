# abifin-app
Case &amp; Document Management

# 🚀 Laravel Development Environment (Docker)
Progetto scritto in laravel 12 per la gestione di clienti e pratiche ad essi associate. Eseguibile tramite docker.  
Fanno parte dello stack:
* React + Inertia.js per il frontend
* HeroUI come UI library
* Tailwind CSS per la parte di stili
* PostgreSQL come db

---

## 🛠️ Requisiti Premessi
* **Docker** e **Docker Compose** installati.
* Privilegi di amministratore (`sudo` su Linux).

---

## 🏁 Installazione e Avvio

1. **Configura l'ambiente**:
Assicurati di avere un file `.env` nella root del progetto con le credenziali scritte nel file .env.docker.

2. **Avviare il server**:
Avviando tramite docker compose l'ambiente, è possibile specificare come parametro RUN_ALL_SEEDS=true per generare in automatico una serie di seeders di test:
* clienti con relativi utenti
* pratiche legate ai clienti.  
Se non specificato, inserirà solo l'utente di Admin.

3. **Utilizzo della web app**:
Aprire il browser su localhost:8000. Nella pagina di login inserire le credenziali di admin:  
**mail**: admin@test.it  
**psw**: admin
