DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE player (
  id int NOT NULL AUTO_INCREMENT,
  diceRoll integer NOT NULL,
  victoryPoints integer NOT NULL,
  settlements integer NOT NULL,
  cities integer NOT NULL,
  roadLength integer NOT NULL,
  knightCount integer NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
