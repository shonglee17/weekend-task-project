CREATE TABLE "task" (
  --"column_name" datatype constraints
  "id" SERIAL PRIMARY KEY,
  "job" VARCHAR(500) NOT NULL,
  "description" VARCHAR(500) NOT NULL
);

INSERT INTO "task"
	("job", "description")
	VALUES
	('Configure PLC', 'Create a connection between two programs'),
	('Level Up League of Legends Account To Level 30', 'Each minion gives 200exp per kill. 1 minion kill takes 37 seconds. To reach level 30, you will need 2.5million exp. points, Good luck. '),
	('Feed Oreo', 'Feed the dragon before 9am CST or suffer the consequences.'),
	('Take out the trash', 'If you want boys night, I suggest you do this first or sleep on the couch');