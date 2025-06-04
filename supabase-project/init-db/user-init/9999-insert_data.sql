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
-- Data for Name: prepartita; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."prepartita" (
		"title",
		"description",
		"isImprev",
		"isSpecial",
		"ultEstrazione",
		"baseEstrazione",
		"numbExtrPlayer",
		"notaBene",
		"weight"
	)
VALUES (
		'IMPREVISTO SPECIALE',
		'',
		true,
		true,
		true,
		11,
		1,
		'',
		15
	),
	(
		'NESSUN IMPREVISTO',
		'Tutto tranquillo',
		false,
		false,
		false,
		0,
		0,
		'',
		25
	),
	(
		'IMPREVISTO DEVASTANTE',
		'Tre giocatori OUT per problemi intestinali',
		true,
		null,
		true,
		20,
		3,
		'',
		15
	);

--
-- Data for Name: settimana; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."settimana" (
		"title",
		"description",
		"isImprev",
		"weight"
	)
VALUES (
		'IMPREVISTO MOLTO FANTASIOSO...',
		'Descrizione imprevisto fantasioso',
		true,
		15
	),
	(
		'NESSUN IMPREVISTO',
		'Tutto tranquillo per ora...',
		false,
		25
	);

	--
-- Data for Name: prepartita; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."serie-negativa" (
		"title",
		"description",
		"isImprev",
		"ultEstrazione",
		"baseEstrazione",
		"numbExtrPlayer",
		"weight"
	)
VALUES (
		'Squadra contro',
		'4 Top player, i più forti, si ribellano al mister. Mettili fuori squadra. Se vinci riconquisti la loro fiducia fino a fine stagione. Se perdi o pareggi, la prossima partita se ne aggiunge un altro.',
		true,
		false,
		30,
		0,
		15
	),
	(
		'NESSUN IMPREVISTO',
		'Tutto tranquillo',
		false,
		false,
		0,
		0,
		25
	),
	(
		'Gelosia',
		'I due giocatori estratti iniziano una lite e finiscono fuori squadra. Da ora l’imprevisto si rifarà a loro fino a fine stagione. Se viene risorteggiato dovrai scegliere chi tenere cedendo l’altro alla prima finestra utile.',
		true,
		true,
		30,
		2,
		10
	);

--
-- Data for Name: speciali; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."speciali" (
		"titolo",
		"descrizione",
		"ultEstrazione",
		"qtGiocatori",
		"titolariRosa"
	)
VALUES (
		'CALCIO CAMMINATO',
		'Mister Finazzi esige ordine e calma in campo. Schiera titolare in ogni ruolo per questa partita il giocatore con la statistica di velocità più bassa.',
		false,
		0,
		11
	),
	(
		'PINTO FOOTBALL LIFE',
		'Il prode Pinto dopo aver visto cosa accade nei bagni di Football Life invita 3 dei suoi compagni di squadra per una notte folle lui ed i 3 sorteggiati salteranno le prossime 2 partite in casa.',
		true,
		3,
		30
	),
	(
		'AUDIO IN QUESTURA',
		'Mister Finazzi è stato squalificato dopo il recupero dell''audio compromettente registrato dopo il secondo gol dell''Atalanta, simula la prossima partita senza possibilità di intervenire.',
		false,
		0,
		11
	),
	(
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
-- Data for Name: bonus-malus-punti; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bonus-malus-punti" ("tipo", "nome", "valore", "nomeUnder", "nomeOver",
		"nomeSerieMinore", "nomeSerieMinoreOver", "valoreUnder", "valoreOver",
		"valoreSerieMinore", "valoreSerieMinoreOver")
VALUES ('trofei', 'Coppa Nazionale', 10, null, null, null, null, null, null, null, null),
	('trofei', 'Scudetto', 18, null, null, null, null, null, null, null, null),
	('trofei', 'Champions League', 30, null, null, null, null, null, null, null, null),
	('trofei', 'Europa League', 20, null, null, null, null, null, null, null, null),
	('trofei', 'Conference League', 15, null, null, null, null, null, null, null, null),
	('cessioni', '70', 2, null, null, null, null, null, null, null, null),
	('cessioni', '75', 4, null, null, null, null, null, null, null, null),
	('cessioni', '80', 5.5, null, null, null, null, null, null, null, null),
	('cessioni', '85', 7, null, null, null, null, null, null, null, null),
	('cessioni', '90', 9, null, null, null, null, null, null, null, null),
	('acquisti', null, null, '70', '70', '70', '70', -3, -1.5, -1.5, -0.5),
	('acquisti', null, null, '75', '75', '75', '75', -6, -3, -3, -1.5),
	('acquisti', null, null, '80', '80', '80', '80', -9, -6, -4.5, -3),
	('acquisti', null, null, '85', '85', '85', '85', -12, -9, -6, -4.5),
	('acquisti', null, null, '90', '90', '90', '90', -15, -12, -7.5, -6),
	('trend', 'Serie Negativa', -1, null, null, null, null, null, null, null, null),
	('trend', 'Serie Positiva', 1, null, null, null, null, null, null, null, null),
	('fine-camp', '2°', 9, null, null, null, null, null, null, null, null),
	('fine-camp', '3°', 6, null, null, null, null, null, null, null, null),
	('fine-camp', '4°', 5, null, null, null, null, null, null, null, null),
	('fine-camp', '5°', 4, null, null, null, null, null, null, null, null),
	('fine-camp', '6°', 3, null, null, null, null, null, null, null, null),
	('fine-camp', '7°', 1, null, null, null, null, null, null, null, null),
	('fine-camp', 'Cannoniere', 5, null, null, null, null, null, null, null, null),
	('fine-camp', 'Assistman', 3, null, null, null, null, null, null, null, null),
	('fine-camp', 'Portiere', 3, null, null, null, null, null, null, null, null);

--
-- Data for Name: preferenze-immagini; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."preferenze-immagini" ("id", "nome", "url")
VALUES ( 1,'Prepartita', NULL),
	( 2,'Settimana', NULL),
	( 3,'Serie Negativa', NULL),
	( 4,'Ingaggi', NULL),
	( 5,'Mercato', NULL),
	( 6,'Saldo Punti', NULL),
	( 7,'Logo Squadra', NULL);



--
-- Use Postgres to create a bucket.
--

ALTER TABLE storage.buckets ADD public boolean;


insert into storage.buckets (id, name, public)
values ('immagini', 'immagini', true);


CREATE POLICY "Anyone can view images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'immagini');

CREATE POLICY "Anyone can upload images" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'immagini');

CREATE POLICY "Anyone can update images 1qem02d_0" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'immagini');


