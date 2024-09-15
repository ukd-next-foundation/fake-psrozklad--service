-- CreateTable
CREATE TABLE "Building" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Classroom" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "buildingID" INTEGER NOT NULL,
    CONSTRAINT "Classroom_buildingID_fkey" FOREIGN KEY ("buildingID") REFERENCES "Building" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Departament" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Faculty" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Group" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "facultyID" INTEGER NOT NULL,
    CONSTRAINT "Group_facultyID_fkey" FOREIGN KEY ("facultyID") REFERENCES "Faculty" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lesson" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "departamentID" INTEGER NOT NULL,
    CONSTRAINT "User_departamentID_fkey" FOREIGN KEY ("departamentID") REFERENCES "Departament" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Schedule" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "half" TEXT NOT NULL,
    "lessonID" INTEGER,
    "teacherID" INTEGER,
    "classroomID" INTEGER,
    "groups" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "replacement" TEXT NOT NULL,
    "reservation" TEXT NOT NULL,
    "tableIndex" TEXT NOT NULL,
    "teachersAdd" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "online" TEXT NOT NULL,
    "comment4link" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    CONSTRAINT "Schedule_lessonID_fkey" FOREIGN KEY ("lessonID") REFERENCES "Lesson" ("ID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "User" ("ID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_classroomID_fkey" FOREIGN KEY ("classroomID") REFERENCES "Classroom" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Building_name_key" ON "Building"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_name_key" ON "Classroom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_name_key" ON "Departament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_name_key" ON "Faculty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_name_key" ON "Lesson"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
