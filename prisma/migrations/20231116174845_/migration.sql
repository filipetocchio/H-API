-- CreateEnum
CREATE TYPE "LogActionEnum" AS ENUM ('entry', 'exit');

-- CreateTable
CREATE TABLE "Efetivo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeDeGuerra" TEXT NOT NULL,
    "saram" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "patente" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "ft" TEXT NOT NULL,
    "qrCodeBase64" TEXT NOT NULL DEFAULT '',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAT" TIMESTAMP(3) NOT NULL,
    "accessId" INTEGER,

    CONSTRAINT "Efetivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "ft" TEXT NOT NULL,
    "qrCodeBase64" TEXT NOT NULL DEFAULT '',
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "parentesco" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" "LogActionEnum" NOT NULL,
    "effetivoId" INTEGER,
    "visitanteId" INTEGER NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Efetivo_saram_key" ON "Efetivo"("saram");

-- CreateIndex
CREATE UNIQUE INDEX "Efetivo_placa_key" ON "Efetivo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Efetivo_email_key" ON "Efetivo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Efetivo_telefone_key" ON "Efetivo"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Visitante_cpf_key" ON "Visitante"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Visitante_placa_key" ON "Visitante"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Visitante_email_key" ON "Visitante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Visitante_telefone_key" ON "Visitante"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Access_name_key" ON "Access"("name");

-- AddForeignKey
ALTER TABLE "Efetivo" ADD CONSTRAINT "Efetivo_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_effetivoId_fkey" FOREIGN KEY ("effetivoId") REFERENCES "Efetivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "Visitante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
