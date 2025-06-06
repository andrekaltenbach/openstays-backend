-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3),
    "untilDate" TIMESTAMP(3),
    "permanentOffer" BOOLEAN DEFAULT false,
    "maxNumberOfNights" INTEGER NOT NULL,
    "hasFacilities" BOOLEAN NOT NULL DEFAULT false,
    "hasWifi" BOOLEAN NOT NULL DEFAULT false,
    "hasKitchen" BOOLEAN NOT NULL DEFAULT false,
    "hasWashingMachine" BOOLEAN NOT NULL DEFAULT false,
    "hasShower" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_userName_key" ON "Post"("userName");
