CREATE SEQUENCE IF NOT EXISTS public.conversation_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.conversation_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS public.gender_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.gender_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS public.interested_in_gender_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.interested_in_gender_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS public.interested_in_relation_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.interested_in_relation_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS public.interests_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.interests_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS public.message_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.message_id_seq
    OWNER TO postgres;


CREATE SEQUENCE IF NOT EXISTS public.notification_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

-- ALTER SEQUENCE public.notification_id_seq
--     OWNED BY public.notification.id;

ALTER SEQUENCE public.notification_id_seq
    OWNER TO postgres;


CREATE SEQUENCE IF NOT EXISTS public.participant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.participant_id_seq
    OWNER TO postgres;


CREATE SEQUENCE IF NOT EXISTS public.relationship_type_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.relationship_type_id_seq
    OWNER TO postgres;


-- block sequence
CREATE SEQUENCE IF NOT EXISTS public.user_blocks_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

-- ALTER SEQUENCE public.user_blocks_id_seq
--     OWNED BY public.user_blocks.id;

ALTER SEQUENCE public.user_blocks_id_seq
    OWNER TO postgres;

-- dislike sequence
CREATE SEQUENCE IF NOT EXISTS public.user_dislikes_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

-- ALTER SEQUENCE public.user_dislikes_id_seq
--     OWNED BY public.user_dislikes.id;

ALTER SEQUENCE public.user_dislikes_id_seq
    OWNER TO postgres;


-- likes sequence
CREATE SEQUENCE IF NOT EXISTS public.user_likes_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;


ALTER SEQUENCE public.user_likes_id_seq
    OWNER TO postgres;


-- matches sequence
CREATE SEQUENCE IF NOT EXISTS public.user_matches_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.user_matches_id_seq
    OWNER TO postgres;


-- photo sequence
CREATE SEQUENCE IF NOT EXISTS public.user_photo_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.user_photo_id_seq
    OWNER TO postgres;

-- users sequence
CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.users_id_seq
    OWNER TO postgres;

-- Tables

CREATE TABLE IF NOT EXISTS public.gender
(
    id integer NOT NULL DEFAULT nextval('gender_id_seq'::regclass),
    name character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT gender_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gender
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    firstname character varying(15) COLLATE pg_catalog."default",
    lastname character varying(15) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    famerate numeric(5,2),
    password character varying(64) COLLATE pg_catalog."default",
    aboutme character varying(100) COLLATE pg_catalog."default",
    username character varying(50) COLLATE pg_catalog."default",
    auth_provider character varying(100) COLLATE pg_catalog."default",
    provider_id character varying(255) COLLATE pg_catalog."default",
    birthday date,
    gender_id integer,
    verified_account boolean DEFAULT false,
    setup_finished boolean DEFAULT false,
    verification_token character varying(255) COLLATE pg_catalog."default",
    location character varying(256) COLLATE pg_catalog."default",
    status character varying(10) COLLATE pg_catalog."default" DEFAULT 'offline'::character varying,
    last_seen timestamp without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT gender_id FOREIGN KEY (gender_id)
        REFERENCES public.gender (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.conversation
(
    id integer NOT NULL DEFAULT nextval('conversation_id_seq'::regclass),
    user_id integer,
    time_started timestamp without time zone,
    time_ended timestamp without time zone,
    fame_rate_updated boolean DEFAULT false,
    CONSTRAINT conversation_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.conversation
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.interested_in_gender
(
    id integer NOT NULL DEFAULT nextval('interested_in_gender_id_seq'::regclass),
    user_id integer,
    gender_id integer,
    CONSTRAINT interested_in_gender_pkey PRIMARY KEY (id),
    CONSTRAINT fk_gender FOREIGN KEY (gender_id)
        REFERENCES public.gender (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.interested_in_gender
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.interests
(
    id integer NOT NULL DEFAULT nextval('interests_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT interests_pkey PRIMARY KEY (id),
    CONSTRAINT interests_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.interests
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.participant
(
    id integer NOT NULL DEFAULT nextval('participant_id_seq'::regclass),
    user_id integer,
    conversation_id integer,
    time_joined timestamp without time zone,
    time_left timestamp without time zone,
    CONSTRAINT participant_pkey PRIMARY KEY (id),
    CONSTRAINT fk_conversation FOREIGN KEY (conversation_id)
        REFERENCES public.conversation (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.participant
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.message
(
    id integer NOT NULL DEFAULT nextval('message_id_seq'::regclass),
    participant_id integer,
    message_text text COLLATE pg_catalog."default",
    ts timestamp without time zone,
    CONSTRAINT message_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (participant_id)
        REFERENCES public.participant (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.message
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.relationship_type
(
    id integer NOT NULL DEFAULT nextval('relationship_type_id_seq'::regclass),
    name character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT relationship_type_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.relationship_type
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.user_interests
(
    user_id integer NOT NULL,
    interest_id integer NOT NULL,
    CONSTRAINT user_interests_pkey PRIMARY KEY (user_id, interest_id),
    CONSTRAINT user_interests_interest_id_fkey FOREIGN KEY (interest_id)
        REFERENCES public.interests (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_interests_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_interests
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.user_photo
(
    id integer NOT NULL DEFAULT nextval('user_photo_id_seq'::regclass),
    user_id integer,
    photo_url character varying(255) COLLATE pg_catalog."default",
    upload_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    active boolean,
    CONSTRAINT user_photo_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_photo
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.interested_in_relation
(
    id integer NOT NULL DEFAULT nextval('interested_in_relation_id_seq'::regclass),
    user_id integer,
    relationship_type_id integer,
    CONSTRAINT interested_in_relation_pkey PRIMARY KEY (id),
    CONSTRAINT fk_relationship_type FOREIGN KEY (relationship_type_id)
        REFERENCES public.relationship_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.interested_in_relation
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.user_likes
(
    id integer NOT NULL DEFAULT nextval('user_likes_id_seq'::regclass),
    liker_id integer NOT NULL,
    liked_user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_likes_pkey PRIMARY KEY (id),
    CONSTRAINT user_likes_liker_id_liked_user_id_key UNIQUE (liker_id, liked_user_id),
    CONSTRAINT fk_liked_user FOREIGN KEY (liked_user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_liker FOREIGN KEY (liker_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_likes
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.user_matches
(
    id integer NOT NULL DEFAULT nextval('user_matches_id_seq'::regclass),
    user1_id integer NOT NULL,
    user2_id integer NOT NULL,
    matched_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_matches_pkey PRIMARY KEY (id),
    CONSTRAINT user_matches_user1_id_user2_id_key UNIQUE (user1_id, user2_id),
    CONSTRAINT fk_user1 FOREIGN KEY (user1_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user2 FOREIGN KEY (user2_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_matches
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.user_dislikes
(
    id integer NOT NULL DEFAULT nextval('user_dislikes_id_seq'::regclass),
    disliker_id integer,
    disliked_user_id integer,
    disliked_at timestamp without time zone DEFAULT now(),
    CONSTRAINT user_dislikes_pkey PRIMARY KEY (id),
    CONSTRAINT user_dislikes_disliked_user_id_fkey FOREIGN KEY (disliked_user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_dislikes_disliker_id_fkey FOREIGN KEY (disliker_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_dislikes
    OWNER to postgres;

ALTER TABLE IF EXISTS public.user_matches
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.notification
(
    id integer NOT NULL DEFAULT nextval('notification_id_seq'::regclass),
    senderid integer,
    receiverid integer,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    read boolean DEFAULT false,
    interactedwith boolean DEFAULT false,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notification_pkey PRIMARY KEY (id),
    CONSTRAINT fk_receiver FOREIGN KEY (receiverid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_sender FOREIGN KEY (senderid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.notification
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.user_blocks
(
    id integer NOT NULL DEFAULT nextval('user_blocks_id_seq'::regclass),
    blocker_id integer,
    blocked_user_id integer,
    blocked_at timestamp without time zone DEFAULT now(),
    CONSTRAINT user_blocks_pkey PRIMARY KEY (id),
    CONSTRAINT user_blocks_blocked_user_id_fkey FOREIGN KEY (blocked_user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_blocks_blocker_id_fkey FOREIGN KEY (blocker_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_blocks
    OWNER to postgres;


INSERT INTO gender (name) VALUES 
	('Man'),
	('Woman');

INSERT INTO relationship_type (name) VALUES 
	('long term relationship'),
	('casual'),
	('short term relationship'),
	('still figuring out');

INSERT INTO interests (name) VALUES 
	('Music'),
    ('Travel'),
    ('Reading'),
    ('Sport'),
    ('Movies'),
    ('Art'),
    ('Technology'),
    ('Chess');