PGDMP         3            	    |         	   bancobase %   14.13 (Ubuntu 14.13-0ubuntu0.22.04.1) %   14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)     4           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    16384 	   bancobase    DATABASE     ^   CREATE DATABASE bancobase WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'pt_BR.UTF-8';
    DROP DATABASE bancobase;
                postgres    false            8           0    0    DATABASE bancobase    ACL     +   GRANT ALL ON DATABASE bancobase TO wildev;
                   postgres    false    3383            =           1247    16400    Role    TYPE     ?   CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);
    DROP TYPE public."Role";
       public          wildev    false            �            1259    16416    Tenant    TABLE     R   CREATE TABLE public."Tenant" (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Tenant";
       public         heap    wildev    false            �            1259    16415    Tenant_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Tenant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Tenant_id_seq";
       public          wildev    false    213            9           0    0    Tenant_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Tenant_id_seq" OWNED BY public."Tenant".id;
          public          wildev    false    212            �            1259    16406    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "tenantId" integer NOT NULL
);
    DROP TABLE public."User";
       public         heap    wildev    false    829    829            �            1259    16405    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          wildev    false    211            :           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          wildev    false    210            �            1259    16388    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    wildev    false            �           2604    16419 	   Tenant id    DEFAULT     j   ALTER TABLE ONLY public."Tenant" ALTER COLUMN id SET DEFAULT nextval('public."Tenant_id_seq"'::regclass);
 :   ALTER TABLE public."Tenant" ALTER COLUMN id DROP DEFAULT;
       public          wildev    false    212    213    213            �           2604    16409    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          wildev    false    210    211    211            1          0    16416    Tenant 
   TABLE DATA           ,   COPY public."Tenant" (id, name) FROM stdin;
    public          wildev    false    213   �       /          0    16406    User 
   TABLE DATA           M   COPY public."User" (id, email, password, name, role, "tenantId") FROM stdin;
    public          wildev    false    211   �       -          0    16388    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          wildev    false    209   �       ;           0    0    Tenant_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Tenant_id_seq"', 108, true);
          public          wildev    false    212            <           0    0    User_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."User_id_seq"', 124, true);
          public          wildev    false    210            �           2606    16423    Tenant Tenant_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Tenant" DROP CONSTRAINT "Tenant_pkey";
       public            wildev    false    213            �           2606    16414    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            wildev    false    211            �           2606    16396 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            wildev    false    209            �           1259    16424    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            wildev    false    211            �           2606    16425    User User_tenantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_tenantId_fkey";
       public          wildev    false    211    3232    213            1      x�34��I-.QI�K�+����� @�      /   �   x�Mͻ�0 @ѹ|�3���j�
���K�&"-"�T�z�t��=�0������Q��s�DEP�[��"���K��x�.�s��BAHظ���Z<�����������*g:��9@�U�a�1OЁ⟈�oi�Y�D@Yߨe�"ixv�=��~��e凶#�+���:�:��\4EQ>=�=S      -   �   x�e�1
�0k������V��y�!H�nR���N�j��=�y����&��U�!QdX}B�	��t�\��Y�`Q]0�vt�F���%u��*��mR�EA�M�g �,"�� �U/�:��gڟ��;�ݮ~w�9��G�,�     