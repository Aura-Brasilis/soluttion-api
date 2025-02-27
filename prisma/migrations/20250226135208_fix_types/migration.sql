-- CreateTable
CREATE TABLE "cliente_usina" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_usina" INTEGER NOT NULL,

    CONSTRAINT "cliente_usina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "cpf_cnpj" TEXT NOT NULL,
    "razao_social" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_faturamento" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_usina" INTEGER NOT NULL,
    "mes" TEXT,
    "leitura_1" TEXT,
    "leitura_2" TEXT,
    "mes_ref" TEXT,
    "kwh_injectado" DECIMAL,
    "kwh_minimo" DECIMAL,
    "kwh_ativo" DECIMAL,
    "economia" DECIMAL,
    "tarifa_tusd" DECIMAL,
    "tarifa_te_fv" DECIMAL,
    "total_tarifas_fv" DECIMAL,
    "total_creditado" DECIMAL,
    "cred_adc_band_tarifaria" DECIMAL,
    "contrib_custeio_ip_cip" DECIMAL,
    "cpfl_inquilino" DECIMAL,
    "incentivo_inquilino_investidor" DECIMAL,
    "minimo_investidor" DECIMAL,
    "inquilino_pagar" DECIMAL,
    "taxa_adm_soluttion" DECIMAL,
    "investidor_receber" DECIMAL,
    "credito_debito" DECIMAL,
    "saldo_banco_anterior" DECIMAL,
    "saldo_banco_atual" DECIMAL,
    "observacao" TEXT,

    CONSTRAINT "controle_faturamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquilino_usina" (
    "id_usina" INTEGER NOT NULL,
    "id_inquilino" INTEGER NOT NULL,

    CONSTRAINT "inquilino_usina_pkey" PRIMARY KEY ("id_usina")
);

-- CreateTable
CREATE TABLE "inquilinos" (
    "id" SERIAL NOT NULL,
    "id_inquilino" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "cpf_cnpj" TEXT,
    "razao_social" TEXT,
    "responsavel" TEXT,
    "cep" TEXT,

    CONSTRAINT "inquilinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usinas" (
    "id" SERIAL NOT NULL,
    "id_usina" INTEGER NOT NULL,
    "investimento" DECIMAL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "cpf_cnpj" TEXT,
    "razao_social" TEXT,

    CONSTRAINT "usinas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_usina_id_cliente_id_usina_key" ON "cliente_usina"("id_cliente", "id_usina");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_cnpj_key" ON "clientes"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "inquilinos_inquilino_id_key" ON "inquilinos"("id_inquilino");

-- CreateIndex
CREATE UNIQUE INDEX "usinas_usinaid_key" ON "usinas"("id_usina");

-- AddForeignKey
ALTER TABLE "cliente_usina" ADD CONSTRAINT "cliente_usina_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cliente_usina" ADD CONSTRAINT "cliente_usina_id_usina_fkey" FOREIGN KEY ("id_usina") REFERENCES "usinas"("id_usina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controle_faturamento" ADD CONSTRAINT "controle_faturamento_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controle_faturamento" ADD CONSTRAINT "controle_faturamento_id_usina_fkey" FOREIGN KEY ("id_usina") REFERENCES "usinas"("id_usina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inquilino_usina" ADD CONSTRAINT "inquilino_usina_id_inquilino_fkey" FOREIGN KEY ("id_inquilino") REFERENCES "inquilinos"("id_inquilino") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inquilino_usina" ADD CONSTRAINT "inquilino_usina_id_usina_fkey" FOREIGN KEY ("id_usina") REFERENCES "usinas"("id_usina") ON DELETE CASCADE ON UPDATE NO ACTION;
