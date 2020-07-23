--
-- Name: chefs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chefs (
    id integer NOT NULL,
    name text,
    created_at timestamp without time zone,
    file_id integer,
    about text
);


--
-- Name: chefs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.chefs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: chefs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.chefs_id_seq OWNED BY public.chefs.id;



--
-- Name: vips; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vips (
    id integer NOT NULL,
    linkedin text,
    instagram text,
    anos_exp text,
    about_you text,
    apelido text,
    email text,
    file_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: vips Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: vips Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vips_id_seq OWNED BY public.vips.id;




--
-- Name: files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.files (
    id integer NOT NULL,
    name text,
    path text NOT NULL
);


--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;



--
-- Name: pedido_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pedido_files (
    id integer NOT NULL,
    pedido_id integer,
    file_id integer
);


--
-- Name: pedido_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pedido_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pedido_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pedido_files_id_seq OWNED BY public.pedido_files.id



--
-- Name: ouvidoria_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ouvidoria_files (
    id integer NOT NULL,
    ouvidoria_id integer,
    file_id integer
);


--
-- Name: ouvidoria_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ouvidoria_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ouvidoria_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ouvidoria_files_id_seq OWNED BY public.ouvidoria_files.id;




--
-- Name: recipe_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe_files (
    id integer NOT NULL,
    recipe_id integer,
    file_id integer
);


--
-- Name: recipe_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recipe_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipe_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recipe_files_id_seq OWNED BY public.recipe_files.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    chef_id integer,
    vip_id integer,
    categoria_id integer,
    user_id integer,
    title text,
    ingredients text[],
    preparation text[],
    information text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);



--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: pedido_vip; Type: TABLE; Schema: public; Owner: - Seria tabela pagamento
--

CREATE TABLE public.pedido_vip (
    id integer NOT NULL,
    valor integer, 
    vip_id integer,
    user_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);



--
-- Name: pedido_vip_id_seq; Type: SEQUENCE; Schema: public; Owner: - seria tabela pagamentos
--

CREATE SEQUENCE public.pedido_vip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pedido_vip_id_seq OWNED BY public.pedido_vip.id;




CREATE TABLE public.categoria (
    id integer NOT NULL,
    name text
);


--
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: - seria tabela pagamentos
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;




CREATE TABLE public.assunto (
    id integer NOT NULL,
    name text
);



--
-- Name: assunto_id_seq; Type: SEQUENCE; Schema: public; Owner: - seria tabela pagamentos
--

CREATE SEQUENCE public.assunto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assunto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assunto_id_seq OWNED BY public.assunto.id;

--
-- Name: ouvidoria; Type: TABLE; Schema: public; Owner: -
--


CREATE TABLE public.ouvidoria (
    id integer NOT NULL,
    nota text,
    elogio text,
    exp_site text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    assunto_id integer,
    user_id integer
);


--
-- Name: ouvidoria_id_seq; Type: SEQUENCE; Schema: public; Owner: - seria tabela pagamentos
--

CREATE SEQUENCE public.ouvidoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ouvidoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ouvidoria_id_seq OWNED BY public.ouvidoria.id;



--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    telefone text,
    cpf_cnpj text,
    password text NOT NULL,
    reset_token text,
    reset_token_expires text,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: chefs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chefs ALTER COLUMN id SET DEFAULT nextval('public.chefs_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: -
--
	
TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
		

--
-- Name: recipe_files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files ALTER COLUMN id SET DEFAULT nextval('public.recipe_files_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
--
-- Name: ouvidoria id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria ALTER COLUMN id SET DEFAULT nextval('public.ouvidoria_id_seq'::regclass);
--
-- Name: ouvidoria_files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria_files ALTER COLUMN id SET DEFAULT nextval('public.ouvidoria_files_id_seq'::regclass);
--
-- Name: pedido id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedido_vip ALTER COLUMN id SET DEFAULT nextval('public.pedido_vip_id_seq'::regclass);

--
-- Name: pedido_files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedido_files ALTER COLUMN id SET DEFAULT nextval('public.pedido_files_id_seq'::regclass);
--
-- Name: vips id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vips ALTER COLUMN id SET DEFAULT nextval('public.vips_id_seq'::regclass);
--
-- Name: assunto id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assunto ALTER COLUMN id SET DEFAULT nextval('public.assunto_id_seq'::regclass);


 ----- PAREI AQUI
--
-- Name: chefs chefs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMAR

--
-- Name: recipe_files recipe_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: ouvidoria ouvidoria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria
    ADD CONSTRAINT ouvidoria_pkey PRIMARY KEY (id);

 
--
-- Name: ouvidoria_files ouvidoria_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria_files
    ADD CONSTRAINT ouvidoria_files_pkey PRIMARY KEY (id);

--
-- Name: vips vips_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vips
    ADD CONSTRAINT vips_pkey PRIMARY KEY (id);

--
-- Name: assunto assunto_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assunto
    ADD CONSTRAINT assunto_pkey PRIMARY KEY (id);

--
-- Name: pedido_vip pedido_vip_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedido_vip
    ADD CONSTRAINT pedido_vip_pkey PRIMARY KEY (id);

--
-- Name: pedido_files pedido_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedido_files
    ADD CONSTRAINT pedido_files_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

--Name: users cpf_cnpj
ALTER TABLE ONLY public.users
ADD CONSTRAINT users_cpf_cnpj_key UNIQUE (cpf_cnpj);


--Name: vips apelidos = names
ALTER TABLE ONLY public.vips
ADD CONSTRAINT vips_apelido_key UNIQUE (apelido);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users trigger_set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trigger_set_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: chefs chefs_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id);


--
-- Name: recipe_files recipe_files_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: recipe_files recipe_files_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE;




-- Name: ouvidoria_files ouvidoria_files_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria_files
    ADD CONSTRAINT ouvidoria_files_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: recipe_files recipe_files_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria_files
    ADD CONSTRAINT ouvidoria_files_recipe_id_fkey FOREIGN KEY (ouvidoria_id) REFERENCES public.ouvidoria(id) ON UPDATE CASCADE ON DELETE CASCADE;




-- Name: pedido_files pedido_files_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedido_files
    ADD CONSTRAINT pedido_files_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pedido_files pedido_files_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedido_files
    ADD CONSTRAINT pedido_files_recipe_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedido_vip(id) ON UPDATE CASCADE ON DELETE CASCADE;

----- AQUI 
--
-- Name: recipes recipes_vip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_vip_id_fkey FOREIGN KEY (vip_id) REFERENCES public.vips(id);


    --
-- Name: recipes recipes_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria(id);

--
-- Name: recipes recipes_chef_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_chef_id_fkey FOREIGN KEY (chef_id) REFERENCES public.chefs(id);


--
-- Name: recipes recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

    


--
-- Name: vips vips_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vips
    ADD CONSTRAINT vips_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;

--
-- Name: ouvidoria ouvidoria_assunto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria
    ADD CONSTRAINT ouvidoria_assunto_id_fkey FOREIGN KEY (assunto_id) REFERENCES public.assunto(id) ON DELETE CASCADE;    

--
-- Name: ouvidoria ouvidoria_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ouvidoria
    ADD CONSTRAINT ouvidoria_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;    

--
-- Name: pedido_vip pedido_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedido_vip
    ADD CONSTRAINT pedido_vip_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;    


--
-- PostgreSQL database dump complete
--



