-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "roleId" TEXT NOT NULL,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "img" TEXT,
    "CompanieId" TEXT,
    "reseauId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppConfig" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ninea" TEXT,
    "rccm" TEXT,
    "logo" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "adress" TEXT,
    "webSite" TEXT,
    "version" TEXT,
    "manager" TEXT,
    "createdAt" TEXT,
    "updatedAt" TEXT,

    CONSTRAINT "AppConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiProvider" (
    "id" TEXT NOT NULL,
    "apiType" TEXT NOT NULL DEFAULT 'Mobile Money',
    "provider" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "apiUrl" TEXT NOT NULL,
    "callbackUrl" TEXT,
    "description" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT,

    CONSTRAINT "ApiProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deviceType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "details" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TEXT,

    CONSTRAINT "deviceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "isActiveted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sim" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "imsi" TEXT NOT NULL,
    "provider" TEXT DEFAULT 'ORANGE',
    "price" INTEGER NOT NULL DEFAULT 2000,
    "data" TEXT NOT NULL DEFAULT '3GB',
    "isActiveted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simDevice" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "simId" TEXT NOT NULL,

    CONSTRAINT "simDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licence" (
    "id" TEXT NOT NULL,
    "licenceCode" TEXT,
    "licenceName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "frequence" TEXT NOT NULL DEFAULT 'Mensuelle',
    "licenceAmount" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Licence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reseau" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'AFTU',
    "name" TEXT NOT NULL,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT,

    CONSTRAINT "Reseau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReseauConfig" (
    "id" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL DEFAULT 'global',
    "invoicing" TEXT NOT NULL DEFAULT 'global',
    "depatureDuration" INTEGER NOT NULL DEFAULT 15,
    "agentName" TEXT,
    "agentPhone" TEXT,
    "agentEmail" TEXT,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "ReseauConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companie" (
    "id" TEXT NOT NULL,
    "categorie" TEXT NOT NULL DEFAULT 'AFTU',
    "gestionType" TEXT NOT NULL DEFAULT 'COMMUNE',
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "manager" TEXT,
    "adress" TEXT,
    "ninea" TEXT,
    "logo" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT,
    "ReseauId" TEXT NOT NULL,

    CONSTRAINT "Companie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "contractType" TEXT NOT NULL DEFAULT 'COLLECTIF',
    "contractorType" TEXT NOT NULL DEFAULT 'AFTU',
    "signator" TEXT NOT NULL,
    "cni" TEXT,
    "quality" TEXT NOT NULL DEFAULT 'Président',
    "bobineQuantity" INTEGER NOT NULL DEFAULT 40,
    "deviceType" TEXT,
    "deviceModality" TEXT,
    "duration" TEXT NOT NULL DEFAULT '1',
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "licenceId" TEXT NOT NULL,
    "CompanieId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deviceModality" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" BIGINT NOT NULL DEFAULT 100000,
    "avance" BIGINT NOT NULL DEFAULT 0,
    "echeance" BIGINT NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL DEFAULT 3,
    "statut" TEXT NOT NULL DEFAULT 'En cours',

    CONSTRAINT "deviceModality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContratItem" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContratItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "companieId" TEXT NOT NULL,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "type" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "operatorId" TEXT NOT NULL,
    "CompanieId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "Vehicule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceAttribution" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT '2023',
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deviceId" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "CompanieId" TEXT NOT NULL,
    "vehiculeId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "DeviceAttribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubrics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "CompanieId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "Rubrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "itineraryId" TEXT NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "section" TEXT NOT NULL DEFAULT 'Section 1',
    "itineraryId" TEXT NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Controller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "gender" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ReseauId" TEXT NOT NULL,

    CONSTRAINT "Controller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "gender" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ReseauId" TEXT NOT NULL,

    CONSTRAINT "Regulator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selling" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "userName" TEXT,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expense" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "solde" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTicket" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "isActiveted" BOOLEAN NOT NULL DEFAULT true,
    "itineraryId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "vehiculeId" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "CompanieId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Selling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Control" (
    "id" TEXT NOT NULL,
    "controllerName" TEXT,
    "checkedTickets" INTEGER NOT NULL DEFAULT 0,
    "ticketFraude" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "controllerId" TEXT NOT NULL,
    "trajetId" TEXT NOT NULL,
    "itineraryId" TEXT NOT NULL,
    "sellingId" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "CompanieId" TEXT NOT NULL,
    "vehiculeId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulation" (
    "id" TEXT NOT NULL,
    "vehicules" INTEGER NOT NULL DEFAULT 0,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "regulatorId" TEXT NOT NULL,
    "itineraryId" TEXT NOT NULL,
    "sellingId" TEXT,
    "CompanieId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Regulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracking" (
    "id" TEXT NOT NULL,
    "sellingId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trajet" (
    "id" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "sellingId" TEXT NOT NULL,

    CONSTRAINT "Trajet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'online',
    "isActivated" BOOLEAN NOT NULL DEFAULT true,
    "walletId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "paymentMethodeId" TEXT NOT NULL,
    "sellingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rental" (
    "id" TEXT NOT NULL,
    "Companie" TEXT NOT NULL,
    "CompaniePhone" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "destination" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT true,
    "sellingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Costs" (
    "id" TEXT NOT NULL,
    "rubrics" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "sellingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cni" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passengerId" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recharge" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "ref" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En cours',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletId" TEXT NOT NULL,
    "paymentMethodeId" TEXT NOT NULL,

    CONSTRAINT "Recharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "planId" TEXT NOT NULL,
    "reseauId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiProvider_apiKey_key" ON "ApiProvider"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "ApiProvider_secretKey_key" ON "ApiProvider"("secretKey");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_number_key" ON "Sim"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_imsi_key" ON "Sim"("imsi");

-- CreateIndex
CREATE UNIQUE INDEX "simDevice_deviceId_key" ON "simDevice"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "simDevice_simId_key" ON "simDevice"("simId");

-- CreateIndex
CREATE UNIQUE INDEX "Reseau_name_key" ON "Reseau"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ReseauConfig_reseauId_key" ON "ReseauConfig"("reseauId");

-- CreateIndex
CREATE UNIQUE INDEX "Companie_email_key" ON "Companie"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Companie_phone_key" ON "Companie"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_email_key" ON "Operator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_phone_key" ON "Operator"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicule_matricule_key" ON "Vehicule"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAttribution_code_key" ON "DeviceAttribution"("code");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAttribution_deviceId_key" ON "DeviceAttribution"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Controller_phone_key" ON "Controller"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Regulator_phone_key" ON "Regulator"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_code_key" ON "Ticket"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_phone_key" ON "Passenger"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_email_key" ON "Passenger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_cni_key" ON "Passenger"("cni");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_passengerId_key" ON "Wallet"("passengerId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_name_key" ON "PaymentMethod"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "deviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simDevice" ADD CONSTRAINT "simDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simDevice" ADD CONSTRAINT "simDevice_simId_fkey" FOREIGN KEY ("simId") REFERENCES "Sim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReseauConfig" ADD CONSTRAINT "ReseauConfig_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companie" ADD CONSTRAINT "Companie_ReseauId_fkey" FOREIGN KEY ("ReseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_licenceId_fkey" FOREIGN KEY ("licenceId") REFERENCES "Licence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrics" ADD CONSTRAINT "Rubrics_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrics" ADD CONSTRAINT "Rubrics_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPlan" ADD CONSTRAINT "SubscriptionPlan_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Controller" ADD CONSTRAINT "Controller_ReseauId_fkey" FOREIGN KEY ("ReseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regulator" ADD CONSTRAINT "Regulator_ReseauId_fkey" FOREIGN KEY ("ReseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selling" ADD CONSTRAINT "Selling_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selling" ADD CONSTRAINT "Selling_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "DeviceAttribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selling" ADD CONSTRAINT "Selling_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selling" ADD CONSTRAINT "Selling_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selling" ADD CONSTRAINT "Selling_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selling" ADD CONSTRAINT "Selling_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_controllerId_fkey" FOREIGN KEY ("controllerId") REFERENCES "Controller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_sellingId_fkey" FOREIGN KEY ("sellingId") REFERENCES "Selling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_trajetId_fkey" FOREIGN KEY ("trajetId") REFERENCES "Trajet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Control" ADD CONSTRAINT "Control_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regulation" ADD CONSTRAINT "Regulation_CompanieId_fkey" FOREIGN KEY ("CompanieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regulation" ADD CONSTRAINT "Regulation_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regulation" ADD CONSTRAINT "Regulation_regulatorId_fkey" FOREIGN KEY ("regulatorId") REFERENCES "Regulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regulation" ADD CONSTRAINT "Regulation_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_sellingId_fkey" FOREIGN KEY ("sellingId") REFERENCES "Selling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trajet" ADD CONSTRAINT "Trajet_sellingId_fkey" FOREIGN KEY ("sellingId") REFERENCES "Selling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_paymentMethodeId_fkey" FOREIGN KEY ("paymentMethodeId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sellingId_fkey" FOREIGN KEY ("sellingId") REFERENCES "Selling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trajet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_sellingId_fkey" FOREIGN KEY ("sellingId") REFERENCES "Selling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Costs" ADD CONSTRAINT "Costs_sellingId_fkey" FOREIGN KEY ("sellingId") REFERENCES "Selling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recharge" ADD CONSTRAINT "Recharge_paymentMethodeId_fkey" FOREIGN KEY ("paymentMethodeId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recharge" ADD CONSTRAINT "Recharge_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
