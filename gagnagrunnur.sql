--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.5
-- Dumped by pg_dump version 9.4.5
-- Started on 2015-11-25 22:53:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 176 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2017 (class 0 OID 0)
-- Dependencies: 176
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 172 (class 1259 OID 16534)
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE entries (
    entryid integer NOT NULL,
    entryuser character varying(32),
    entryfrom character varying(50),
    entryto character varying(50),
    request character varying(10),
    smoking character varying(10),
    entryemail character varying(50),
    entryklukka character varying,
    entryfleira character varying(500),
    entryseats integer,
    entryphone character varying(20),
    entrytime date
);


ALTER TABLE entries OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 16537)
-- Name: entries_entryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE entries_entryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE entries_entryid_seq OWNER TO postgres;

--
-- TOC entry 2018 (class 0 OID 0)
-- Dependencies: 173
-- Name: entries_entryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE entries_entryid_seq OWNED BY entries.entryid;


--
-- TOC entry 174 (class 1259 OID 16539)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    userid integer NOT NULL,
    username character varying(32),
    salt character varying(256),
    hash character varying(256),
    useremail character varying(50),
    userphone character varying(20)
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 16545)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_userid_seq OWNER TO postgres;

--
-- TOC entry 2019 (class 0 OID 0)
-- Dependencies: 175
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_userid_seq OWNED BY users.userid;


--
-- TOC entry 1889 (class 2604 OID 16548)
-- Name: entryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entries ALTER COLUMN entryid SET DEFAULT nextval('entries_entryid_seq'::regclass);


--
-- TOC entry 1890 (class 2604 OID 16549)
-- Name: userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN userid SET DEFAULT nextval('users_userid_seq'::regclass);


--
-- TOC entry 2006 (class 0 OID 16534)
-- Dependencies: 172
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY entries (entryid, entryuser, entryfrom, entryto, request, smoking, entryemail, entryklukka, entryfleira, entryseats, entryphone, entrytime) FROM stdin;
33	flatbaka	Reykjavík	Þórshöfn	Farþegum		flat@baka.is	13:37		7	222	2015-11-18
34	flatbaka	Þingeyri	Akranes	Farþegum		flat@baka.is	13:37		1	222	2015-11-26
38	kleinuhringur	Reykjavík	Borgarfjörður	Farþegum	Reyklaus	kleina@hi.is	13:37		4	1234	2015-11-27
42	kleinuhringur	Akureyri	Bolungarvík	Farþegum	Reyklaus	kleina@hi.is	17:25	ASdf asdf asdf asdf	4	1234	2015-11-30
24	kleinuhringur	Bifröst	Þingeyri	Fari	Reyklaus	kleina@hi.is	13:37	dpfgaopisngiaknrgolnwregoinareoignwan'gaolngloaenrg	1	1234	2015-11-11
25	kleinuhringur	Bifröst	Akranes	Farþegum		kleina@hi.is	13:37		3	1234	2015-11-10
26	kleinuhringur	Ólafsfjörður	Bifröst	Fari		kleina@hi.is	13:37	asdf	2	1234	2015-11-16
27	kleinuhringur	Akranes	Akranes	Farþegum		kleina@hi.is	13:37		4	1234	2015-11-16
43	kleinuhringur	Reykjavík	Reykjavík	Farþegum	Reyklaus	kleina@hi.is	13:37		1	1234	2015-11-30
41	kleinuhringur	Akranes	Reykjavík	Farþegum	Reyklaus	kleina@hi.is	13:05	þetta virkar	1	1234	2015-11-27
39	kleinuhringur	Búðardalur	Dalvík	Farþegum	Reyklaus	kleina@hi.is	13:37	JavaScript has three kind of popup boxes: Alert box, Confirm box, and Prompt box. ... When an alert box pops up, the user will have to click "OK" to proceed.	6	1234	2015-11-30
\.


--
-- TOC entry 2020 (class 0 OID 0)
-- Dependencies: 173
-- Name: entries_entryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('entries_entryid_seq', 43, true);


--
-- TOC entry 2008 (class 0 OID 16539)
-- Dependencies: 174
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (userid, username, salt, hash, useremail, userphone) FROM stdin;
7	flatkaka	8R3B8fX6u3GvjHprTmt6zlilXv4eWzk84PbI7B7yRNaVOXlv55MEXfl2oYxnhjeHtreRkpnBteVHjBDlzz9OvXUUUAxFQ+yL04dJzCT50hlnMKz81UV2GdW/xP5WjTAqJVzKCh/qD5a4aex0INX+IdquDuZWR6Kbi6SIJmfPE6A=	fC6OOFMOJXP8WoEfbPUx+GA/Mq/U9q25qP9hCvz0f7J4CCs7o+79q39Q7pdeP1++2v7ybxSGvQRY6XcdPzWP+Sk90g+pZET1M129ho1y3tbEy9VBN5It5cv8OR9Gh3gSOzGO3e4UcJETY0WQec3lcELbSe31eQyLflv/b4nuN+s=	flat@kaka.is	5512345
1	kleinuhringur	CjIy12XHc6qAvFgjFGUAoU2moCyYGaMI1q7f5cwV1CA2fAcf+jYumcERyaq43oYje7gY/Ii+qswIDjKbDJ1+mxs4qhUe7js83V/MLorVSwsVZaQgJPYYSXb1YHndCBHzBNhYCeBR/YS7pFPqEeXwO4tebpZrfs/Q5z59fKiltFw=	75VaUy+Excyf/4U1dggsK7Qmv8NwfqgyBn2FfAHGptpnpcTviT+e34xwkbWDMugQdFIjvt7H/lGNiQHlDyru82GgXOVleD3ZpFnwZ9JYtAWDWCKrOWBUjJ38RuKGHMXixLmojzwmcaTk8evKNcs8K52XUcMJloX2VEosTIbiRdw=	kleina@hi.is	1234
2	flatbaka	EaSkrJ3GFDHuomVyCe54lIj863iaYUZd/BSK8bxBhmyvRj4n0dfwgDBZYEgPgto0e0yBBY1HqZp1vJSLQurMoZYo0T7K87LByhxvwT0w2zhvspG204s49UY1VDca1AMCoFKfdTLNCEoPyAf/KOLqICYj4kC23O17TrgWi5Joufg=	JT2lDOlacEYO0Nws4UETPSCbHokHD4wmsy1Die/ZHfzs41ThVylftXbylBlxmO8PjJZaWr/JYCOnPUJ85hnN8TYvyfcoThgTasmkXt0G9u3i1aWA1hk57qx1H+kK9L6+EpZJSEnGUhoZIz+qfmjgKSngGdB+JkQlM02SH+mBAEQ=	flat@baka.is	222
3	skonsa	l7AA4PGvbn3z1yEFM9xCDRRtOdmaX1i2qpq0MFxp+ldq4oqnpJuUu6npMstgzwS/JI7mg3cyQRE4mpuHcd7MoGcmSe/ewC4Rv5sPfj22W8yICPQh5Emq+WTBPInAh10PCprO6sBdafz6aStC+Tm4OfC9LXulIocyvK0haknxUhg=	cZ8VI/WD3jsZi7dktqNc3rB5TmF5CKdWHunpHX3V3H4zbo+JIa3OOaFocUF9h4peYErlvzorVn6Ssy1wcSwqNiG1MGeL224bdPN7NzNQyYtWxqNV0XqvbudbDJa8VlH2crbkqEyoMtH1EnqBjFv3DLWuvEHTyrHj8cPdYL2YhBM=	skonsa@skonsa.is	453525252
4	asdfasdf	fQr/wZKFz4DTbezfG1THCDN4Y6U2QovNATHs5H9ZggajNriYzkcJFqj9qs2M6Kp1yqfvYhdR04xXZ4sZMpAAVSTfy5lh6bfALx8NqYG7+mvs2gvkcFTDDutILIOpxjf/hMveEu7Y95ICkWuA5VZWP5yte9cZvOm+uC0mFIOkOcU=	CQC9FYxOlyGpNdBT/QiOD/8IjgEugvS3uuQFMazMx5mrG6Yb0I0hJRKewJrK2+v+2mPS1w27eRkhtHNKLXmCEssMBU3dEXfdIkMb80YWizytIUG5xwcfzqMRDZ2JGmlYgjaw2Ra/yr2kL4ZonGp49xFBA901HWSh5Y/3c33FxiQ=	netfang@hi.is	123412341234
8	#*	pSMdMnnqXErTbF5QTYmRTaffGG0AiQGRBxq2kLxEHMnqH9wEjCWBxTnycVMgInT5FhwduXzdLv0KAuNVSaR0rVRI/MSeE/QwG+iGNr+O+NMpm8Mk3WnxYZPjYjC8//iIXY/i62QAUwNGVZFgrDgffTJqvfWEnWnA1aLbHo6func=	zx+4Gr1ohavs0cNeGL0LEXEQ+bvYQ5Bgya1KjL7zRXh6kKzrb9WetTpG1K6D/A3TbZius7ZBDgYn8Kqa2vkNnIRWu2osWoXlQUI8I2w1ksA2xJN9e2IQv8P2W0zEMxeVzUpQa9HKsy9ZS/RbnNjgOpY/goW/bOQfvlbO54JusdQ=	h@h.is	123123123
\.


--
-- TOC entry 2021 (class 0 OID 0)
-- Dependencies: 175
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_userid_seq', 8, true);


--
-- TOC entry 1892 (class 2606 OID 16553)
-- Name: entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (entryid);


--
-- TOC entry 1894 (class 2606 OID 16555)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 1896 (class 2606 OID 16557)
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2016 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-11-25 22:53:11

--
-- PostgreSQL database dump complete
--

