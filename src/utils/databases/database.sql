-- Filename: business_solution_centers_schema.sql

-- SQL schema for the Business Solution Centers application.
-- Contains the definitions for Consultants, Projects, ProjectConsultants,
-- ProgressReport, Files, and ChatMessages tables.

CREATE DATABASE `business_solution_centers`;
USE `business_solution_centers`;

-- Create 'Consultants' table
CREATE TABLE `Consultants` (
  `consultantID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `userRole` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`consultantID`)
);

-- Create 'Projects' table
CREATE TABLE `Projects` (
  `projectID` INT NOT NULL AUTO_INCREMENT,
  `projectName` VARCHAR(255) NOT NULL,
  `deadline` DATE NOT NULL,
  `budget` DECIMAL(10,2) NOT NULL,
  `managerID` INT NOT NULL,
  PRIMARY KEY (`projectID`)
);

-- Create 'ProjectConsultants' table
CREATE TABLE `ProjectConsultants` (
  `projectConsultantID` INT NOT NULL AUTO_INCREMENT,
  `consultantID` INT NOT NULL,
  `projectID` INT NOT NULL,
  PRIMARY KEY (`projectConsultantID`),
  FOREIGN KEY (`consultantID`) REFERENCES `Consultants` (`consultantID`),
  FOREIGN KEY (`projectID`) REFERENCES `Projects` (`projectID`)
);

-- Create 'ProgressReport' table
CREATE TABLE `ProgressReport` (
  `reportID` INT NOT NULL AUTO_INCREMENT,
  `reportDate` DATE NOT NULL,
  `progressDetail` TEXT NOT NULL,
  `consultantID` INT NOT NULL,
  `projectID` INT NOT NULL,
  PRIMARY KEY (`reportID`),
  FOREIGN KEY (`consultantID`) REFERENCES `Consultants` (`consultantID`),
  FOREIGN KEY (`projectID`) REFERENCES `Projects` (`projectID`)
);

-- Create 'Files' table
CREATE TABLE `Files` (
  `fileID` INT NOT NULL AUTO_INCREMENT,
  `fileName` VARCHAR(255) NOT NULL,
  `uploadDate` DATE NOT NULL,
  `filePath` TEXT NOT NULL,
  `projectID` INT NOT NULL,
  PRIMARY KEY (`fileID`),
  FOREIGN KEY (`projectID`) REFERENCES `Projects` (`projectID`)
);

-- Create 'ChatMessages' table
CREATE TABLE `ChatMessages` (
  `messageID` INT NOT NULL AUTO_INCREMENT,
  `messageText` TEXT NOT NULL,
  `timeStamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `projectID` INT NOT NULL,
  `senderID` INT NOT NULL,
  PRIMARY KEY (`messageID`),
  FOREIGN KEY (`projectID`) REFERENCES `Projects` (`projectID`),
  FOREIGN KEY (`senderID`) REFERENCES `Consultants` (`consultantID`)
);



-- Below are some sample SQL queries related to the schema:

-- Query to insert a new consultant
INSERT INTO `Consultants` (`userName`, `email`, `userRole`) VALUES ('jdoe', 'jdoe@example.com', 'Senior Consultant');

-- Query to create a new project
INSERT INTO `Projects` (`projectName`, `deadline`, `budget`, `managerID`) VALUES ('Project Alpha', '2023-12-31', 100000.00, 1);

-- Query to assign a consultant to a project
INSERT INTO `ProjectConsultants` (`consultantID`, `projectID`) VALUES (1, 1);

-- Query to log a progress report
INSERT INTO `ProgressReport` (`reportDate`, `progressDetail`, `consultantID`, `projectID`) VALUES (CURDATE(), 'Completed initial project setup.', 1, 1);

-- Query to upload a file related to a project
INSERT INTO `Files` (`fileName`, `uploadDate`, `filePath`, `projectID`) VALUES ('project_plan.pdf', CURDATE(), '/documents/project_alpha/', 1);

-- Query to send a chat message
INSERT INTO `ChatMessages` (`messageText`, `projectID`, `senderID`) VALUES ('Hello team, please check the updated project plan.', 1, 1);

-- Query to select all projects managed by a specific manager
SELECT * FROM `Projects` WHERE `managerID` = 1;

-- Query to get all consultants working on a particular project
SELECT c.userName, c.email
FROM `Consultants` c
JOIN `ProjectConsultants` pc ON c.consultantID = pc.consultantID
WHERE pc.projectID = 1;

-- Query to retrieve the latest progress report for each project
SELECT pr.*
FROM `ProgressReport` pr
JOIN (
    SELECT `projectID`, MAX(`reportDate`) as LatestReportDate
    FROM `ProgressReport`
    GROUP BY `projectID`
) LatestPR ON pr.projectID = LatestPR.projectID AND pr.reportDate = LatestPR.LatestReportDate;





