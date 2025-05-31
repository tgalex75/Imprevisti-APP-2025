# Guida all'Installazione dell'Applicazione

Questa guida ti aiuterà ad installare ed eseguire l'applicazione sul tuo computer. L'applicazione utilizza React per il front-end e Supabase per il backend, entrambi gestiti tramite Docker.

## Prerequisiti

Prima di iniziare, assicurati di avere installato Docker e Git sul tuo sistema.

### 1. Docker

Docker è una piattaforma che permette di eseguire applicazioni in ambienti isolati chiamati container.

* **Windows**: Scarica e installa [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/).
* **macOS**: Scarica e installa [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/).
* **Linux**: Installa Docker Engine seguendo la guida per la tua distribuzione specifica. Puoi trovare le istruzioni su [Install Docker Engine](https://docs.docker.com/engine/install/). Generalmente, dopo l'installazione di Docker Engine, avrai bisogno anche di Docker Compose. Su molte distribuzioni Linux, Docker Compose viene installato come plugin di Docker CLI (`docker compose`) oppure come pacchetto separato (`docker-compose`). Verifica la documentazione per la tua distribuzione.

### 2. Git e `git.exe` nel PATH (Soprattutto per Windows)

Git è necessario per clonare il repository dell'applicazione. Inoltre, il processo di build di Docker o Docker Compose stesso potrebbe necessitare dell'eseguibile `git.exe` disponibile nel PATH di sistema per raccogliere informazioni sul repository o per altre operazioni.

* **Tutti i Sistemi Operativi**: Se non hai Git, scaricalo da [git-scm.com](https://git-scm.com/downloads).
* **IMPORTANTE per Utenti Windows**:
    * È fondamentale installare **Git per Windows** (disponibile su [git-scm.com](https://git-scm.com/downloads)).
    * Durante l'installazione, assicurati di selezionare un'opzione che aggiunga Git al PATH di sistema. L'opzione raccomandata è solitamente "Git from the command line and also from 3rd-party software".
    * **Avere solo GitHub Desktop installato potrebbe non essere sufficiente**, poiché potrebbe non aggiungere `git.exe` al PATH di sistema in modo che Docker possa trovarlo.
    * **Dopo aver installato Git o modificato il PATH, riavvia il tuo terminale (PowerShell, Git Bash, Prompt dei Comandi) e, per sicurezza, anche Docker Desktop.** Questo assicura che le modifiche al PATH vengano recepite correttamente.

## **Installazione**

Segui questi passaggi per mettere in funzione l'applicazione:

### **1\. Ottieni il Codice Sorgente 📂**

Apri un terminale (su Windows puoi usare Git Bash, PowerShell o il Prompt dei Comandi; su macOS e Linux puoi usare il Terminale) e clona il repository dell'applicazione:
`git clone https://github.com/tgalex75/imprevisti-supabase-docker.git`

`cd imprevisti-supabase-docker`

Verifica l'URL effettivo del repository del tuo progetto ed il nome della cartella che viene creata dopo la clonazione.

### **2\. Configura le Variabili d'Ambiente ⚙️**

L'applicazione necessita di alcune chiavi di configurazione per connettersi a Supabase. Solitamente, queste sono gestite tramite un file `.env`. Ne troverai due uno nella directory primaria (dove si trova il Dockerfile insomma) e l'altro nella cartella del progetto docker, ossia la cartella chiamata `supabase-project`.

1. **Cerca i file di esempio**: All'interno della cartella del progetto, dovresti trovare un file chiamato `.env.example`. Questi file mostrano quali variabili d'ambiente sono necessarie, sia per il Frontend che per il Backend (il database insomma!).
2. **Crea i due file .env**: Duplica i rispettivi file .env.example e rinominali in .env (in entrambe le cartelle **ricordalo**!).
   
   * Su Linux e macOS puoi usare il comando: `cp .env.example .env`
   * Su Windows puoi usare il comando: `copy .env.example .env`
3. **Inserisci i tuoi valori - (PASSAGGIO NON OBBLIGATORIO)**, se desideri personalizzarli (non necessario finché fai girare la app in locale: questa infatti comprende già dei valori di **default**. Apri i file `.env` con un editor di testo e inserisci i valori corretti per le variabili d'ambiente relative a Supabase (come SUPABASE\_URL e SUPABASE\_ANON\_KEY). Queste informazioni dovresti averle dal tuo progetto Supabase. `# Esempio di contenuto del file .env` `REACT_APP_SUPABASE_URL=IL_TUO_URL_SUPABASE` `REACT_APP_SUPABASE_ANON_KEY=LA_TUA_ANON_KEY_SUPABASE`
   
   `# Altre variabili necessarie per il backend...`
   `# Ad esempio, se anche il backend Dockerizzato le necessita direttamente:`
   `# POSTGRES_PASSWORD=una_password_sicura_per_il_db_locale_se_supabase_e_dockerizzato_localmente`
   `# (Nota: Se Supabase è un servizio cloud, le chiavi API sono generalmente sufficienti per il frontend.`
   `# Se anche il backend Supabase è dockerizzato come parte del tuo stack, potrebbero servire più variabili)`
   **Importante**: Assicurati che i nomi delle variabili nel file .env corrispondano a quelli attesi dai tuoi container Docker (controlla il Dockerfile o il file docker-compose.yml).

### **3\. Costruzione dell'Immagine Docker con `buildx` 🛠️**

Per costruire il frontend che ti consentirà di interagire con la APP da Browser, è necessario costruire l'immagine docker che si occuperà di scaricare ed installare tutto il necessario.

1. **Apri il terminale** nella cartella radice `imprevisti-supabase-docker` (la stessa dove si trovano il `Dockerfile` ed il `package.json`).
2. **Esegui il seguente comando** per costruire l'immagine di base Docker: `docker build -t frontend .`
   **Importante**: Attenzione al *punto* alla fine del comando appena indicato: esso è infatti necessario per dirgli di installare il necessario nella cartella attuale.
   
### **4\. Avvia l'Applicazione con Docker Compose 🚀**

Docker Compose è uno strumento per definire ed eseguire applicazioni Docker multi-container. Il tuo progetto dovrebbe includere un file docker-compose.yml che definisce i servizi per il front-end e il backend.

1. **Spostati** nella cartella principale del progetto `supabase-project`  (la stessa dove si trova il file `docker-compose.yml`).
2. **Esegui il seguente comando** per costruire le immagini Docker (se non esistono già) e avviare i container: `docker-compose up -d` oppure, più probabile nelle versioni più recenti di Docker `docker compose up -d`
   
   * docker-compose up: Questo comando avvia i servizi definiti nel file docker-compose.yml.
   * \--build: Questa opzione forza la ricostruzione delle immagini Docker prima di avviare i container. È utile se hai apportato modifiche al codice sorgente o ai Dockerfile.

Attendi che il processo di avvio dei containers e avvio sia completato. Se preferisci vedere i log nel terminale che indicano lo stato dei container, avvia invece con `docker compose up`

### **5\. Accedi all'Applicazione 🌐**

Una volta che i container sono avviati correttamente, dovresti essere in grado di accedere all'applicazione tramite il tuo browser web.

* Solitamente, il front-end React è accessibile all'indirizzo: http://localhost:3000 (o la porta specificata nel file docker-compose.yml o nel Dockerfile del front-end).

Controlla i log nel terminale o il file docker-compose.yml per vedere su quale porta è esposta l'applicazione.

### **6\. Fermare l'Applicazione 🛑**

Per fermare l'applicazione e i relativi container Docker:

1. Torna al terminale dove hai eseguito docker-compose up.
2. Premi Ctrl \+ C.
3. Potrebbe essere necessario attendere qualche secondo affinché i container si arrestino correttamente.
4. Per assicurarti che i container siano rimossi (opzionale, ma utile per liberare risorse), puoi eseguire:`docker-compose down`
   o, per le versioni più recenti:`docker compose down`
   Questo comando ferma e rimuove i container, le reti e, opzionalmente, i volumi definiti nel docker-compose.yml.

## **Risoluzione dei Problemi Comuni 🛠️**

* **Errore di porta già in uso (Port is already allocated)**:
  * Significa che un altro servizio sta utilizzando la porta che Docker sta cercando di usare. Puoi cambiare la porta nel file docker-compose.yml (ad esempio, cambiando "3000:3000" in "3001:3000" per accedere all'app su http://localhost:3001) oppure fermare il servizio che sta usando la porta.
* **Problemi di permessi su Linux**:
  * Se ricevi errori di permessi quando esegui i comandi Docker, potresti dover aggiungere il tuo utente al gruppo docker: sudo usermod \-aG docker ${USER}. Dopo aver eseguito questo comando, dovrai effettuare il logout e poi di nuovo il login, o riavviare il sistema, affinché le modifiche abbiano effetto. In alternativa, puoi eseguire i comandi Docker con sudo (non raccomandato per motivi di sicurezza per operazioni di routine).
* **Errori durante la fase di build**:
  * Controlla i messaggi di errore nel terminale. Spesso indicano dipendenze mancanti nel Dockerfile o errori nel codice dell'applicazione.
  * Assicurati che il file .env sia configurato correttamente e che le variabili d'ambiente siano disponibili durante il processo di build se necessario (alcune configurazioni di build le prelevano in quel momento).
* **I container si avviano ma l'app non è raggiungibile**:
  * Controlla i log dei container per errori specifici: docker logs \<nome\_container\_frontend\> e docker logs \<nome\_container\_backend\>. Puoi trovare i nomi dei container con docker ps.
  * Verifica la configurazione di rete nel docker-compose.yml e assicurati che le porte siano esposte correttamente.
  * Assicurati che le variabili d'ambiente per la connessione a Supabase (REACT\_APP\_SUPABASE\_URL e REACT\_APP\_SUPABASE\_ANON\_KEY) siano corrette e accessibili dal container del front-end.

