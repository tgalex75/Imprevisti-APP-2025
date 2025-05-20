SET session_replication_role = replica;
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: imprevisti; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."speciali" (
		"id",
		"titolo",
		"descrizione",
		"ultEstrazione",
		"qtGiocatori",
		"titolariRosa"
	)
VALUES (
		'628b2f97-52c6-40c8-b433-79b3303fcfec',
		'CALCIO CAMMINATO',
		'Mister Finazzi esige ordine e calma in campo. Schiera titolare in ogni ruolo per questa partita il giocatore con la statistica di velocità più bassa.',
		false,
		0,
		11
	),
	(
		'7e4826b0-de17-417e-a992-ae4105726428',
		'COSTE TO COSTE 2.0',
		'È andato via Coste? Nessun problema. Prendi palla col difensore che lo sostituisce e portala Coste to Coste, obiettivo gol/assist. Se riesci prossima partita le nostre slide velocità avranno un +5, altrimenti - 5',
		false,
		0,
		11
	),
	(
		'e3de199c-5e56-4aef-afa0-fe1e06276610',
		'CHI HA FATTO PALO?',
		'Un grande imprenditore Arabo, Nalir Colbuk, si è appassionato alle ultime vicende della Juve Stabia. Non potendo fare a meno di ridere di gusto ad ogni legno colpito dalla squadra, decide di investire su di essa: ad ogni palo colpito durante l''episodio, aggiungi un punto al saldo mercato. ',
		false,
		0,
		30
	),
	(
		'580a00f9-4955-43a6-8932-42959cba8b83',
		'BRACCIA TOLTE A...',
		'Il presidente della Juve Stabia decide di assumere nella sua ditta edilizia, la Abusivismo S.p.a,  i 5 giocatori più scarsi della primavera. Acquisisci 0,5 punti per ogni giocatore mandato in cantiere.',
		false,
		0,
		30
	),
	(
		'b37331d5-9272-40ed-bcb2-5b444e50fa4c',
		'PAPERINO',
		'Dalle visite mediche si scopre Kwakman sia il frutto di una tresca in Olanda di Pato, il “Papero” per eccellenza della serie A, finto infortunio e vacanza per un mese a Rio con il padre.',
		false,
		0,
		30
	),
	(
		'556a0776-8275-430e-b54d-bc31c88ef0ed',
		'PINTO FOOTBALL LIFE',
		'Il prode Pinto dopo aver visto cosa accade nei bagni di Football Life invita 3 dei suoi compagni di squadra per una notte folle lui ed i 3 sorteggiati salteranno le prossime 2 partite in casa.',
		true,
		3,
		30
	),
	(
		'8e9595c7-a83f-4941-b758-c0edaf444c7a',
		'AUDIO IN QUESTURA',
		'Mister Finazzi è stato squalificato dopo il recupero dell''audio compromettente registrato dopo il secondo gol dell''Atalanta, simula la prossima partita senza possibilità di intervenire.',
		false,
		0,
		11
	),
	(
		'8d63b66c-ded2-47c0-9200-ca4a5744fda9',
		'VITALE NO BOMBER ACADEMIA',
		'Con l''addio di Pedrito "All Might" Mendes, "Deku" Vitale ha studiato un piano riuscendo a convincere "Bakougo" Bonneau: ingaggia un preparatore per gli Attaccanti e schiera il tridente stretto (AT-ATT-AT) Vitale-Pinto-Bonneau per tre partite.',
		false,
		0,
		30
	);

--
-- Data for Name: ingaggi-mercato; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."ingaggi-mercato" (
        "tipo",
		"titolo",
		"descrizione",
		"isImprev",
        "weight"
	)
VALUES (
		'ingaggi',
		'Visite OK',
        'La trattativa viene chiusa senza conseguenze.',
		false,
		15
	),
    (
		'ingaggi',
		'Visite NON superate!',
        'La trattativa salta e non può essere ritentata fino alla prossima finestra di mercato.',
		true,
		15
	),
    (
		'mercato',
		'Visite OK',
        'Totale libertà di scelta.',
		false,
		15
	),
    (
		'mercato',
		'Visite NON superate!',
        'Accetta offerta o raddoppia ingaggio appena possibile.',
		true,
		15
	);

--
-- Data for Name: saldo-punti; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."saldo-punti" ("punti")
VALUES (10);

--
-- Data for Name: bonus-trofei; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bonus-trofei" ("nome", "valore")
VALUES ('Coppa Nazionale', 10),
	('Scudetto', 18),
	('Champions League', 30),
	('Europa League', 20),
	('Conference League', 15);
--
-- Data for Name: bonus-cessioni; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bonus-cessioni" ("nome", "valore")
VALUES ('70', 2),
	('75', 4),
	('80', 5.5),
	('85', 7),
	('90', 9);

	
--
-- Data for Name: malus-acquisti; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."malus-acquisti" (
		"nomeUnder",
		"nomeOver",
		"nomeSerieMinori",
		"nomeSerieMinoriOver",
		"valoreUnder",
		"valoreOver",
		"valoreSerieMinore",
		"valoreSerieMinoreOver"
	)
VALUES ('70', '70', '70', '70', -3, -1.5, -1.5, -0.5),
	('75', '75', '75', '75', -6, -3, -3, -1.5),
	('80', '80', '80', '80', -9, -6, -4.5, -3),
	('85', '85', '85', '85', -12, -9, -6, -4.5),
	('90', '90', '90', '90', -15, -12, -7.5, -6);


--
-- Data for Name: trend-prestazioni; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."trend-prestazioni" ("nome", "valore")
VALUES ('Serie Negativa', -1),
	('Serie Positiva', 1);


--
-- Data for Name: fine-campionato; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."fine-campionato" ("nome", "valore")
VALUES (2, 9),
	('3', 6),
	('4', 5),
	('5', 4),
	('6', 3),
	('7', 1),
	('Cannoniere', 5),
	('Assistman', 3),
	('Portiere', 3);