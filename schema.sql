DROP DATABASE IF EXISTS trackerdb;

CREATE DATABASE trackerdb;

USE trackerdb;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  Department VARCHAR(50) NOT NULL,
  salary INT not null 
  manager VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);