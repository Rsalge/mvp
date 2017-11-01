DROP DATABASE IF EXISTS settlers;

CREATE DATABASE settlers;

USE settlers;
CREATE TABLE players (
  id integer NOT NULL AUTO_INCREMENT,
  name varchar (255),
  playerOrder integer NOT NULL,
  turn integer NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE turns (
  id integer NOT NULL AUTO_INCREMENT,
  playerId integer NOT NULL,
  diceRoll integer NOT NULL,
  victoryPoints integer NOT NULL,
  settlements integer NOT NULL,
  cities integer NOT NULL,
  roadLength integer NOT NULL,
  knightCount integer NOT NULL,
  turn integer NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (playerId) REFERENCES players(id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u student < server/schema.sql
 *  to create the database and the tables.*/
