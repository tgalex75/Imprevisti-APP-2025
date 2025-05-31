Guida all'Installazione dell'Applicazione
Questa guida ti aiuterà ad installare ed eseguire l'applicazione sul tuo computer. L'applicazione utilizza React per il front-end e Supabase per il backend, entrambi gestiti tramite Docker.
Prerequisiti
Prima di iniziare, assicurati di avere installato Docker sul tuo sistema. Docker è una piattaforma che permette di eseguire applicazioni in ambienti isolati chiamati container.
 * Windows: Scarica e installa Docker Desktop for Windows.
 * macOS: Scarica e installa Docker Desktop for Mac.
 * Linux: Installa Docker Engine seguendo la guida per la tua distribuzione specifica. Puoi trovare le istruzioni su Install Docker Engine. Generalmente, dopo l'installazione di Docker Engine, avrai bisogno anche di Docker Compose. Su molte distribuzioni Linux, Docker Compose viene installato come plugin di Docker CLI (docker compose) oppure come pacchetto separato (docker-compose). Verifica la documentazione per la tua distribuzione.
Assicurati anche di avere Git installato per clonare il repository dell'applicazione. Se non lo hai, puoi scaricarlo da git-scm.com.
Installazione
Segui questi passaggi per mettere in funzione l'applicazione:
1. Ottieni il Codice Sorgente 📂
Apri un terminale (su Windows puoi usare Git Bash, PowerShell o il Prompt dei Comandi; su macOS e Linux puoi usare il Terminale) e clona il repository dell'applicazione:
git clone <URL_DEL_TUO_REPOSITORY_GIT>
cd <NOME_DELLA_CARTELLA_DEL_PROGETTO>

Sostituisci <URL_DEL_TUO_REPOSITORY_GIT> con l'URL effettivo del repository del tuo progetto e <NOME_DELLA_CARTELLA_DEL_PROGETTO> con il nome della cartella che viene creata dopo la clonazione.
2. Configura le Variabili d'Ambiente ⚙️
L'applicazione necessita di alcune chiavi di configurazione per connettersi a Supabase. Solitamente, queste sono gestite tramite un file .env.
 * Cerca un file di esempio: All'interno della cartella del progetto, dovresti trovare un file chiamato .env.example o simile. Questo file mostra quali variabili d'ambiente sono necessarie.
 * Crea il tuo file .env: Duplica il file .env.example e rinominalo in .env.
   * Su Linux e macOS puoi usare il comando: cp .env.example .env
   * Su Windows puoi usare il comando: copy .env.example .env
 * Inserisci i tuoi valori: Apri il file .env con un editor di testo e inserisci i valori corretti per le variabili d'ambiente relative a Supabase (come SUPABASE_URL e SUPABASE_ANON_KEY). Queste informazioni dovresti averle dal tuo progetto Supabase.
   # Esempio di contenuto del file .env
REACT_APP_SUPABASE_URL=IL_TUO_URL_SUPABASE
REACT_APP_SUPABASE_ANON_KEY=LA_TUA_ANON_KEY_SUPABASE

# Altre variabili necessarie per il backend...
# Ad esempio, se anche il backend Dockerizzato le necessita direttamente:
# POSTGRES_PASSWORD=una_password_sicura_per_il_db_locale_se_supabase_e_dockerizzato_localmente
# (Nota: Se Supabase è un servizio cloud, le chiavi API sono generalmente sufficienti per il frontend.
# Se anche il backend Supabase è dockerizzato come parte del tuo stack, potrebbero servire più variabili)

   Importante: Assicurati che i nomi delle variabili nel file .env corrispondano a quelli attesi dai tuoi container Docker (controlla il Dockerfile o il file docker-compose.yml).
3. Avvia l'Applicazione con Docker Compose 🚀
Docker Compose è uno strumento per definire ed eseguire applicazioni Docker multi-container. Il tuo progetto dovrebbe includere un file docker-compose.yml che definisce i servizi per il front-end e il backend.
 * Apri il terminale nella cartella principale del progetto (la stessa dove si trova il file docker-compose.yml).
 * Esegui il seguente comando per costruire le immagini Docker (se non esistono già) e avviare i container:
   docker-compose up --build

   * docker-compose up: Questo comando avvia i servizi definiti nel file docker-compose.yml.
   * --build: Questa opzione forza la ricostruzione delle immagini Docker prima di avviare i container. È utile se hai apportato modifiche al codice sorgente o ai Dockerfile.
   Se la tua versione di Docker Compose è integrata con la Docker CLI (più comune nelle versioni recenti), il comando potrebbe essere:
   docker compose up --build

   Attendi che il processo di build e avvio sia completato. Vedrai molti log nel terminale che indicano lo stato dei container.
4. Accedi all'Applicazione 🌐
Una volta che i container sono avviati correttamente, dovresti essere in grado di accedere all'applicazione tramite il tuo browser web.
 * Solitamente, il front-end React è accessibile all'indirizzo: http://localhost:3000 (o la porta specificata nel file docker-compose.yml o nel Dockerfile del front-end).
Controlla i log nel terminale o il file docker-compose.yml per vedere su quale porta è esposta l'applicazione.
5. Fermare l'Applicazione 🛑
Per fermare l'applicazione e i relativi container Docker:
 * Torna al terminale dove hai eseguito docker-compose up.
 * Premi Ctrl + C.
 * Potrebbe essere necessario attendere qualche secondo affinché i container si arrestino correttamente.
 * Per assicurarti che i container siano rimossi (opzionale, ma utile per liberare risorse), puoi eseguire:
   docker-compose down

   o, per le versioni più recenti:
   docker compose down

   Questo comando ferma e rimuove i container, le reti e, opzionalmente, i volumi definiti nel docker-compose.yml.
Risoluzione dei Problemi Comuni 🛠️
 * Errore di porta già in uso (Port is already allocated):
   * Significa che un altro servizio sta utilizzando la porta che Docker sta cercando di usare. Puoi cambiare la porta nel file docker-compose.yml (ad esempio, cambiando  "3000:3000" in "3001:3000"  per accedere all'app su http://localhost:3001) oppure fermare il servizio che sta usando la porta.
 * Problemi di permessi su Linux:
   * Se ricevi errori di permessi quando esegui i comandi Docker, potresti dover aggiungere il tuo utente al gruppo docker: sudo usermod -aG docker ${USER}. Dopo aver eseguito questo comando, dovrai effettuare il logout e poi di nuovo il login, o riavviare il sistema, affinché le modifiche abbiano effetto. In alternativa, puoi eseguire i comandi Docker con sudo (non raccomandato per motivi di sicurezza per operazioni di routine).
 * Errori durante la fase di build:
   * Controlla i messaggi di errore nel terminale. Spesso indicano dipendenze mancanti nel Dockerfile o errori nel codice dell'applicazione.
   * Assicurati che il file .env sia configurato correttamente e che le variabili d'ambiente siano disponibili durante il processo di build se necessario (alcune configurazioni di build le prelevano in quel momento).
 * I container si avviano ma l'app non è raggiungibile:
   * Controlla i log dei container per errori specifici: docker logs <nome_container_frontend> e docker logs <nome_container_backend>. Puoi trovare i nomi dei container con docker ps.
   * Verifica la configurazione di rete nel docker-compose.yml e assicurati che le porte siano esposte correttamente.
   * Assicurati che le variabili d'ambiente per la connessione a Supabase (REACT_APP_SUPABASE_URL e REACT_APP_SUPABASE_ANON_KEY) siano corrette e accessibili dal container del front-end.