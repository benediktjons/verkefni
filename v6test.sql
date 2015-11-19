-- Table: public.v6test

-- DROP TABLE public.v6test;

CREATE TABLE public.v6test
( id serial NOT NULL,
  username character varying(32),
  salt character varying(256),
  hash character varying(256),
  date timestamp with time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_username_key UNIQUE (username)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.v6test
  OWNER TO postgres;
