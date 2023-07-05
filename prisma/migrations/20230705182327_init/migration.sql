-- CreateTable
CREATE TABLE "Role" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "name" STRING,
    "roleId" STRING NOT NULL,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "phone" STRING,
    "img" STRING,
    "companieId" STRING,
    "reseauId" STRING,
    "userId" STRING NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" STRING NOT NULL,
    "code" STRING,
    "type" STRING DEFAULT 'Orange',
    "isActiveted" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licence" (
    "id" STRING NOT NULL,
    "licenceCode" STRING,
    "licenceName" STRING NOT NULL,
    "type" STRING NOT NULL,
    "frequence" STRING NOT NULL DEFAULT 'Mensuelle',
    "licenceAmount" STRING NOT NULL,
    "isActive" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Licence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sim" (
    "id" STRING NOT NULL,
    "number" STRING NOT NULL,
    "imsi" STRING NOT NULL,
    "provider" STRING DEFAULT 'ORANGE',
    "deviceId" STRING NOT NULL,
    "isActiveted" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reseau" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reseau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" STRING NOT NULL,
    "contractNumber" STRING NOT NULL,
    "contractType" STRING NOT NULL DEFAULT 'Collectif',
    "contractorType" STRING NOT NULL DEFAULT 'GIE',
    "contractorName" STRING NOT NULL,
    "contractorNINEA" STRING,
    "contractorPhone" STRING,
    "contractorEmail" STRING,
    "signatoryName" STRING NOT NULL,
    "signatoryCNI" STRING NOT NULL,
    "signatoryQuality" STRING NOT NULL DEFAULT 'Président',
    "bobineQuantity" INT4 NOT NULL DEFAULT 40,
    "deviceType" STRING NOT NULL,
    "devicceModality" STRING,
    "duration" STRING NOT NULL DEFAULT '1',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" STRING NOT NULL DEFAULT 'active',
    "licenceId" STRING NOT NULL,
    "companieId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReseauConfig" (
    "id" STRING NOT NULL,
    "itinerary" STRING NOT NULL DEFAULT 'global',
    "invoicing" STRING NOT NULL DEFAULT 'global',
    "depatureDuration" INT4 NOT NULL DEFAULT 15,
    "agentName" STRING,
    "agentPhone" STRING,
    "agentEmail" STRING,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "ReseauConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companie" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING,
    "phone" STRING,
    "manager" STRING,
    "adress" STRING,
    "type" STRING,
    "logo" STRING,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ReseauId" STRING NOT NULL,

    CONSTRAINT "Companie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operator" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING,
    "phone" STRING,
    "companieId" STRING NOT NULL,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" STRING NOT NULL,
    "matricule" STRING NOT NULL,
    "type" STRING,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "operatorId" STRING NOT NULL,
    "companieId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "Vehicule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceAttribution" (
    "id" STRING NOT NULL,
    "code" STRING NOT NULL DEFAULT '2023',
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deviceId" STRING NOT NULL,
    "operatorId" STRING NOT NULL,
    "companieId" STRING NOT NULL,
    "vehiculeId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "DeviceAttribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "startPoString" STRING NOT NULL,
    "endPoString" STRING NOT NULL,
    "distance" FLOAT8 NOT NULL DEFAULT 0,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "companieId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubrics" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "companieId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "Rubrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "latitude" FLOAT8 NOT NULL,
    "longitude" FLOAT8 NOT NULL,
    "itineraryId" STRING NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "price" STRING NOT NULL,
    "itineraryId" STRING NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "price" FLOAT8 NOT NULL DEFAULT 0,
    "duration" INT4 NOT NULL DEFAULT 1,
    "isActive" BOOL NOT NULL DEFAULT true,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Controller" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "phone" STRING,
    "password" STRING,
    "gender" STRING,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ReseauId" STRING NOT NULL,

    CONSTRAINT "Controller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulator" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "phone" STRING,
    "password" STRING,
    "gender" STRING,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ReseauId" STRING NOT NULL,

    CONSTRAINT "Regulator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selling" (
    "id" STRING NOT NULL,
    "userId" STRING,
    "userName" STRING,
    "revenue" FLOAT8 NOT NULL DEFAULT 0,
    "expense" FLOAT8 NOT NULL DEFAULT 0,
    "solde" FLOAT8 NOT NULL DEFAULT 0,
    "totalTicket" INT4 NOT NULL DEFAULT 0,
    "type" STRING,
    "startTime" STRING,
    "endTime" STRING,
    "isActiveted" BOOL NOT NULL DEFAULT true,
    "itineraryId" STRING NOT NULL,
    "deviceId" STRING NOT NULL,
    "vehiculeId" STRING NOT NULL,
    "operatorId" STRING NOT NULL,
    "companieId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Selling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Control" (
    "id" STRING NOT NULL,
    "controllerName" STRING,
    "checkedTickets" INT4 NOT NULL DEFAULT 0,
    "ticketFraude" INT4 NOT NULL DEFAULT 0,
    "comment" STRING,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "controllerId" STRING NOT NULL,
    "trajetId" STRING NOT NULL,
    "itineraryId" STRING NOT NULL,
    "sellingId" STRING NOT NULL,
    "operatorId" STRING NOT NULL,
    "companieId" STRING NOT NULL,
    "vehiculeId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulation" (
    "id" STRING NOT NULL,
    "vehicules" INT4 NOT NULL DEFAULT 0,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "regulatorId" STRING NOT NULL,
    "itineraryId" STRING NOT NULL,
    "sellingId" STRING,
    "companieId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Regulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracking" (
    "id" STRING NOT NULL,
    "sellingId" STRING NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "latitude" FLOAT8 NOT NULL,
    "longitude" FLOAT8 NOT NULL,
    "speed" FLOAT8,
    "heading" FLOAT8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trajet" (
    "id" STRING NOT NULL,
    "duration" STRING NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "distance" FLOAT8 NOT NULL,
    "sellingId" STRING NOT NULL,

    CONSTRAINT "Trajet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" STRING NOT NULL,
    "code" STRING NOT NULL,
    "price" FLOAT8 NOT NULL,
    "name" STRING NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" STRING NOT NULL DEFAULT 'online',
    "isActivated" BOOL NOT NULL DEFAULT true,
    "walletId" STRING NOT NULL,
    "tripId" STRING NOT NULL,
    "paymentMethodeId" STRING NOT NULL,
    "sellingId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rental" (
    "id" STRING NOT NULL,
    "custumer" STRING NOT NULL,
    "custumerPhone" STRING,
    "price" FLOAT8 NOT NULL,
    "destination" STRING NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isActivated" BOOL NOT NULL DEFAULT true,
    "sellingId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Costs" (
    "id" STRING NOT NULL,
    "rubrics" STRING NOT NULL,
    "amount" FLOAT8 NOT NULL,
    "sellingId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "email" STRING NOT NULL,
    "cni" STRING NOT NULL,
    "gender" STRING NOT NULL,
    "status" STRING NOT NULL,
    "password" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" STRING NOT NULL,
    "balance" FLOAT8 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passengerId" STRING NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recharge" (
    "id" STRING NOT NULL,
    "amount" FLOAT8 NOT NULL,
    "ref" STRING NOT NULL,
    "status" STRING NOT NULL DEFAULT 'En cours',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletId" STRING NOT NULL,
    "paymentMethodeId" STRING NOT NULL,

    CONSTRAINT "Recharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" STRING NOT NULL,
    "passengerId" STRING NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOL NOT NULL DEFAULT true,
    "planId" STRING NOT NULL,
    "reseauId" STRING NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_code_key" ON "Device"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_number_key" ON "Sim"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_imsi_key" ON "Sim"("imsi");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_deviceId_key" ON "Sim"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Reseau_name_key" ON "Reseau"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_contractNumber_key" ON "Contract"("contractNumber");

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
ALTER TABLE "Account" ADD CONSTRAINT "Account_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sim" ADD CONSTRAINT "Sim_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_licenceId_fkey" FOREIGN KEY ("licenceId") REFERENCES "Licence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReseauConfig" ADD CONSTRAINT "ReseauConfig_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companie" ADD CONSTRAINT "Companie_ReseauId_fkey" FOREIGN KEY ("ReseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAttribution" ADD CONSTRAINT "DeviceAttribution_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrics" ADD CONSTRAINT "Rubrics_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrics" ADD CONSTRAINT "Rubrics_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPlan" ADD CONSTRAINT "SubscriptionPlan_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Controller" ADD CONSTRAINT "Controller_ReseauId_fkey" FOREIGN KEY ("ReseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regulator" ADD CONSTRAINT "Regulator_ReseauId_fkey" FOREIGN KEY ("ReseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selling" ADD CONSTRAINT "Selling_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Control" ADD CONSTRAINT "Control_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Regulation" ADD CONSTRAINT "Regulation_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Companie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
