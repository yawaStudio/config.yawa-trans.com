-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'GESTIONNAIRE', 'SELLER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "rememberMeToken" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ninea" TEXT,
    "rccm" TEXT,
    "ville" TEXT,
    "pays" TEXT,
    "logo" TEXT,
    "gestionnaire" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "cni" TEXT NOT NULL,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agents" (
    "id" SERIAL NOT NULL,
    "companieId" INTEGER NOT NULL,
    "name" TEXT,
    "phone" TEXT NOT NULL,
    "codeSecret" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SELLER',
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicules" (
    "id" SERIAL NOT NULL,
    "companieId" INTEGER NOT NULL,
    "modelVehicule" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "img" TEXT,
    "numberSeats" INTEGER NOT NULL,
    "airConditioned" BOOLEAN NOT NULL DEFAULT true,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lignes" (
    "id" SERIAL NOT NULL,
    "companieId" INTEGER NOT NULL,
    "lieuDepart" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "modelVehicule" TEXT,
    "frequence" INTEGER NOT NULL DEFAULT 7,
    "prixBillet" INTEGER NOT NULL,
    "tripCondition" TEXT NOT NULL,
    "garage" TEXT NOT NULL,
    "isRoundtrip" BOOLEAN NOT NULL DEFAULT true,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lignes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voyages" (
    "id" SERIAL NOT NULL,
    "companieId" INTEGER NOT NULL,
    "ligneId" INTEGER NOT NULL,
    "tripDate" DATE NOT NULL,
    "checkoutTime" TIME NOT NULL,
    "cars" INTEGER NOT NULL DEFAULT 0,
    "seats" INTEGER NOT NULL DEFAULT 0,
    "seatsAvailable" INTEGER NOT NULL DEFAULT 0,
    "carsAvailable" INTEGER NOT NULL DEFAULT 0,
    "passagers" INTEGER NOT NULL DEFAULT 0,
    "revenus" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voyages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passagers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cni" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passagers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "agents_phone_key" ON "agents"("phone");

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicules" ADD CONSTRAINT "vehicules_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lignes" ADD CONSTRAINT "lignes_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voyages" ADD CONSTRAINT "voyages_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voyages" ADD CONSTRAINT "voyages_ligneId_fkey" FOREIGN KEY ("ligneId") REFERENCES "lignes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
