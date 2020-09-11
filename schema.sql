DROP DATABASE IF EXISTS trackerdb;

CREATE DATABASE trackerdb;

USE trackerdb;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (9,2),
  department_id INT,
  PRIMARY KEY(id),
);

CREATE TABLE employee
(
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY(id),
);
