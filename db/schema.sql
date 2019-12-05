DROP DATABASE IF EXISTS burgers_db; 

CREATE DATABASE burgers_db; 


USE burgers_db; 
CREATE TABLE burgers(
    id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL, 
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);


USE burgers_db; 
SELECT * FROM burgers;