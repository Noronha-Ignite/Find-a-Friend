-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('NEW_BORN', 'YOUNG', 'GROWN_UP');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALLER', 'SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "Ambient" AS ENUM ('SPACIOUS', 'TIGHT', 'ANY');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "type" "PetType" NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy_level" "Level" NOT NULL,
    "independency_level" "Level" NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetImage" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "PetImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetAdoptionRequirement" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,

    CONSTRAINT "PetAdoptionRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "whatsapp" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pet_organization_id_idx" ON "Pet"("organization_id");

-- CreateIndex
CREATE INDEX "PetImage_pet_id_idx" ON "PetImage"("pet_id");

-- CreateIndex
CREATE INDEX "PetAdoptionRequirement_pet_id_idx" ON "PetAdoptionRequirement"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetImage" ADD CONSTRAINT "PetImage_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetAdoptionRequirement" ADD CONSTRAINT "PetAdoptionRequirement_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
