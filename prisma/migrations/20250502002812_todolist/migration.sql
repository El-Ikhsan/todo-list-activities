-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "information" VARCHAR(500),
    "day" VARCHAR(10) NOT NULL,
    "date" VARCHAR(50),
    "time" VARCHAR(50) NOT NULL,
    "username" VARCHAR(100) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
