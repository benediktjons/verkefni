--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.5
-- Dumped by pg_dump version 9.4.5
-- Started on 2015-11-20 20:40:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 178 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2028 (class 0 OID 0)
-- Dependencies: 178
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 172 (class 1259 OID 16529)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE comments (
    cid integer NOT NULL,
    cuser character varying(32),
    cdate timestamp with time zone,
    ctext character varying(300)
);


ALTER TABLE comments OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 16532)
-- Name: comments_cid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE comments_cid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_cid_seq OWNER TO postgres;

--
-- TOC entry 2029 (class 0 OID 0)
-- Dependencies: 173
-- Name: comments_cid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE comments_cid_seq OWNED BY comments.cid;


--
-- TOC entry 174 (class 1259 OID 16534)
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE entries (
    entryid integer NOT NULL,
    entryuser character varying(32),
    entrytime character varying(50),
    entryfrom character varying(50),
    entryto character varying(50),
    request character varying(10),
    smoking character varying(10),
    entryphone integer,
    entryemail character varying(50),
    entryklukka character varying,
    entryfleira character varying(500)
);


ALTER TABLE entries OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 16537)
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
-- TOC entry 2030 (class 0 OID 0)
-- Dependencies: 175
-- Name: entries_entryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE entries_entryid_seq OWNED BY entries.entryid;


--
-- TOC entry 176 (class 1259 OID 16539)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    userid integer NOT NULL,
    username character varying(32),
    salt character varying(256),
    hash character varying(256),
    useremail character varying(50),
    userphone integer
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 16545)
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
-- TOC entry 2031 (class 0 OID 0)
-- Dependencies: 177
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_userid_seq OWNED BY users.userid;


--
-- TOC entry 1895 (class 2604 OID 16547)
-- Name: cid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comments ALTER COLUMN cid SET DEFAULT nextval('comments_cid_seq'::regclass);


--
-- TOC entry 1896 (class 2604 OID 16548)
-- Name: entryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entries ALTER COLUMN entryid SET DEFAULT nextval('entries_entryid_seq'::regclass);


--
-- TOC entry 1897 (class 2604 OID 16549)
-- Name: userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN userid SET DEFAULT nextval('users_userid_seq'::regclass);


--
-- TOC entry 2015 (class 0 OID 16529)
-- Dependencies: 172
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY comments (cid, cuser, cdate, ctext) FROM stdin;
\.


--
-- TOC entry 2032 (class 0 OID 0)
-- Dependencies: 173
-- Name: comments_cid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('comments_cid_seq', 1, false);


--
-- TOC entry 2017 (class 0 OID 16534)
-- Dependencies: 174
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY entries (entryid, entryuser, entrytime, entryfrom, entryto, request, smoking, entryphone, entryemail, entryklukka, entryfleira) FROM stdin;
8	kleinuhringur	11/03/2015	Akranes	Akranes	Farþegum		123456	kleina@hi.is	\N	\N
9	kleinuhringur	11/10/2015	Hveragerði	Akranes	Fari	Reyklaus	123456	kleina@hi.is	\N	\N
10	kleinuhringur	11/25/2015	Akranes	Þórshöfn	Farþegum	Reyklaus	123456	kleina@hi.is	13:14	fer til eyja 'a morgun ekki b'ida eftir m'er
\.


--
-- TOC entry 2033 (class 0 OID 0)
-- Dependencies: 175
-- Name: entries_entryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('entries_entryid_seq', 10, true);


--
-- TOC entry 2019 (class 0 OID 16539)
-- Dependencies: 176
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (userid, username, salt, hash, useremail, userphone) FROM stdin;
1	kleinuhringur	CjIy12XHc6qAvFgjFGUAoU2moCyYGaMI1q7f5cwV1CA2fAcf+jYumcERyaq43oYje7gY/Ii+qswIDjKbDJ1+mxs4qhUe7js83V/MLorVSwsVZaQgJPYYSXb1YHndCBHzBNhYCeBR/YS7pFPqEeXwO4tebpZrfs/Q5z59fKiltFw=	75VaUy+Excyf/4U1dggsK7Qmv8NwfqgyBn2FfAHGptpnpcTviT+e34xwkbWDMugQdFIjvt7H/lGNiQHlDyru82GgXOVleD3ZpFnwZ9JYtAWDWCKrOWBUjJ38RuKGHMXixLmojzwmcaTk8evKNcs8K52XUcMJloX2VEosTIbiRdw=	kleina@hi.is	123456
2	flatbaka	EaSkrJ3GFDHuomVyCe54lIj863iaYUZd/BSK8bxBhmyvRj4n0dfwgDBZYEgPgto0e0yBBY1HqZp1vJSLQurMoZYo0T7K87LByhxvwT0w2zhvspG204s49UY1VDca1AMCoFKfdTLNCEoPyAf/KOLqICYj4kC23O17TrgWi5Joufg=	JT2lDOlacEYO0Nws4UETPSCbHokHD4wmsy1Die/ZHfzs41ThVylftXbylBlxmO8PjJZaWr/JYCOnPUJ85hnN8TYvyfcoThgTasmkXt0G9u3i1aWA1hk57qx1H+kK9L6+EpZJSEnGUhoZIz+qfmjgKSngGdB+JkQlM02SH+mBAEQ=	flat@baka.is	12345
\.


--
-- TOC entry 2034 (class 0 OID 0)
-- Dependencies: 177
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_userid_seq', 2, true);


--
-- TOC entry 1899 (class 2606 OID 16551)
-- Name: comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (cid);


--
-- TOC entry 1901 (class 2606 OID 16553)
-- Name: entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (entryid);


--
-- TOC entry 1903 (class 2606 OID 16555)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 1905 (class 2606 OID 16557)
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2027 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-11-20 20:40:54

--
-- PostgreSQL database dump complete
--

