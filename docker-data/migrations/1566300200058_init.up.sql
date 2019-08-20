CREATE TABLE public.block (
    num integer NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    txcount integer NOT NULL,
    orderer integer NOT NULL,
    hash bytea NOT NULL
);
COMMENT ON TABLE public.block IS 'Block meta table';
CREATE TABLE public.transaction (
    txid text NOT NULL,
    type integer NOT NULL,
    "from" bytea NOT NULL,
    "to" bytea NOT NULL,
    coin bigint NOT NULL,
    arg text NOT NULL,
    "readSet" bytea NOT NULL,
    "writeSet" bytea NOT NULL,
    "blockNum" integer NOT NULL,
    version integer NOT NULL
);
ALTER TABLE ONLY public.block
    ADD CONSTRAINT block_pkey PRIMARY KEY (num);
ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (txid);
ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "transaction_blockNum_fkey" FOREIGN KEY ("blockNum") REFERENCES public.block(num) ON UPDATE RESTRICT ON DELETE RESTRICT;
