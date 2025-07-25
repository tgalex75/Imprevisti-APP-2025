

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


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";



CREATE TABLE IF NOT EXISTS "public"."bonus-annuali" (
    "id" smallint NOT NULL
);


ALTER TABLE "public"."bonus-annuali" OWNER TO "postgres";


ALTER TABLE "public"."bonus-annuali" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."bonus-annuali_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."speciali" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "titolo" "text" NOT NULL,
    "descrizione" "text" NOT NULL,
    "ultEstrazione" boolean,
    "qtGiocatori" smallint DEFAULT '0'::smallint,
    "titolariRosa" smallint DEFAULT '30'::smallint
);


ALTER TABLE "public"."speciali" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."registroimprevisti" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "quantity" smallint
);


ALTER TABLE "public"."registroimprevisti" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."registroo" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "tipo" "text"
);


ALTER TABLE "public"."registroo" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."saldo-punti" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "punti" real NOT NULL
);


ALTER TABLE "public"."saldo-punti" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."salvaxdopo" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "titolo" "text",
    "descrizione" "text" NOT NULL
);


ALTER TABLE "public"."salvaxdopo" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."prepartita" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NULL,
    "isImprev" boolean NULL,
    "isSpecial" boolean NULL,
    "ultEstrazione" boolean NULL,
    "baseEstrazione" smallint NULL,
    "numbExtrPlayer" smallint NULL,
    "notaBene" text NULL,
    "weight" integer NULL
);


ALTER TABLE "public"."prepartita" OWNER TO "postgres";



CREATE TABLE IF NOT EXISTS "public"."settimana" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text",
    "description" "text" NULL,
    "isImprev" boolean NULL,
    "weight" integer NULL
);


ALTER TABLE "public"."settimana" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."preferenze-immagini" (
    "id" smallint NOT NULL,
    "nome" "text",
    "url" "text" NULL
);


ALTER TABLE "public"."preferenze-immagini" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ingaggi-mercato" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tipo" "text" NOT NULL,
    "titolo" "text" NOT NULL,
    "descrizione" "text" NOT NULL,
    "isImprev" boolean NOT NULL,
    "weight" integer NOT NULL
);


ALTER TABLE "public"."ingaggi-mercato" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."serie-negativa" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text",
    "description" "text" NULL,
    "isImprev" boolean NULL,
    "ultEstrazione" boolean NULL,
    "baseEstrazione" smallint NOT NULL,
    "numbExtrPlayer" smallint NOT NULL,
    "weight" integer NULL
);


ALTER TABLE "public"."serie-negativa" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bonus-malus-punti" (
    "id" smallint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    "tipo" "text" NOT NULL,
    "nome" "text" NULL,
    "valore" real NULL,
    "nomeUnder" "text" NULL,
	"nomeOver" "text" NULL, 
	"nomeSerieMinore" "text" NULL,
	"nomeSerieMinoreOver" "text" NULL,
	"valoreUnder" real NULL,
	"valoreOver" real NULL,
	"valoreSerieMinore" real NULL,
	"valoreSerieMinoreOver" real NULL
);


ALTER TABLE "public"."bonus-malus-punti" OWNER TO "postgres";


ALTER TABLE ONLY "public"."speciali"
    ADD CONSTRAINT "speciali_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."registroimprevisti"
    ADD CONSTRAINT "registroimprevisti_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."registroo"
    ADD CONSTRAINT "registroo_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."saldo-punti"
    ADD CONSTRAINT "saldo-punti_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."salvaxdopo"
    ADD CONSTRAINT "salvaxdopo_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."prepartita"
    ADD CONSTRAINT "prepartita_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."settimana"
    ADD CONSTRAINT "settimana_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."preferenze-immagini"
    ADD CONSTRAINT "preferenze-immagini_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ingaggi-mercato"
    ADD CONSTRAINT "ingaggi-mercato_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."serie-negativa"
    ADD CONSTRAINT "serie-negativa_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bonus-malus-punti"
    ADD CONSTRAINT "bonus-malus-punti_pkey" PRIMARY KEY ("id");



--
-- RLS POLICIES
--


ALTER TABLE "public"."bonus-annuali" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."speciali" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."registroimprevisti" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."registroo" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."saldo-punti" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."salvaxdopo" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."prepartita" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."settimana" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."preferenze-immagini" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ingaggi-mercato" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."serie-negativa" DISABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."bonus-malus-punti" DISABLE ROW LEVEL SECURITY;



ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."bonus-annuali" TO "anon";
GRANT ALL ON TABLE "public"."bonus-annuali" TO "authenticated";
GRANT ALL ON TABLE "public"."bonus-annuali" TO "service_role";



GRANT ALL ON SEQUENCE "public"."bonus-annuali_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."bonus-annuali_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."bonus-annuali_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."speciali" TO "anon";
GRANT ALL ON TABLE "public"."speciali" TO "authenticated";
GRANT ALL ON TABLE "public"."speciali" TO "service_role";



GRANT ALL ON TABLE "public"."registroimprevisti" TO "anon";
GRANT ALL ON TABLE "public"."registroimprevisti" TO "authenticated";
GRANT ALL ON TABLE "public"."registroimprevisti" TO "service_role";



GRANT ALL ON TABLE "public"."registroo" TO "anon";
GRANT ALL ON TABLE "public"."registroo" TO "authenticated";
GRANT ALL ON TABLE "public"."registroo" TO "service_role";



GRANT ALL ON TABLE "public"."saldo-punti" TO "anon";
GRANT ALL ON TABLE "public"."saldo-punti" TO "authenticated";
GRANT ALL ON TABLE "public"."saldo-punti" TO "service_role";



GRANT ALL ON TABLE "public"."salvaxdopo" TO "anon";
GRANT ALL ON TABLE "public"."salvaxdopo" TO "authenticated";
GRANT ALL ON TABLE "public"."salvaxdopo" TO "service_role";



GRANT ALL ON TABLE "public"."prepartita" TO "anon";
GRANT ALL ON TABLE "public"."prepartita" TO "authenticated";
GRANT ALL ON TABLE "public"."prepartita" TO "service_role";



GRANT ALL ON TABLE "public"."settimana" TO "anon";
GRANT ALL ON TABLE "public"."settimana" TO "authenticated";
GRANT ALL ON TABLE "public"."settimana" TO "service_role";



GRANT ALL ON TABLE "public"."preferenze-immagini" TO "anon";
GRANT ALL ON TABLE "public"."preferenze-immagini" TO "authenticated";
GRANT ALL ON TABLE "public"."preferenze-immagini" TO "service_role";



GRANT ALL ON TABLE "public"."ingaggi-mercato" TO "anon";
GRANT ALL ON TABLE "public"."ingaggi-mercato" TO "authenticated";
GRANT ALL ON TABLE "public"."ingaggi-mercato" TO "service_role";



GRANT ALL ON TABLE "public"."serie-negativa" TO "anon";
GRANT ALL ON TABLE "public"."serie-negativa" TO "authenticated";
GRANT ALL ON TABLE "public"."serie-negativa" TO "service_role";



GRANT ALL ON TABLE "public"."bonus-malus-punti" TO "anon";
GRANT ALL ON TABLE "public"."bonus-malus-punti" TO "authenticated";
GRANT ALL ON TABLE "public"."bonus-malus-punti" TO "service_role";





ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;