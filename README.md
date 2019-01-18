Express + MongoDB

---- Setup project on Windows system -----
1. Make sure already setup Node and Mongo in window OS
  If Not, you need to install Node and MongoDB
  - download Node for window
  - download mongodb for window
2. Setup MongoDB database for our project
  - create database and collection (database name is 'mydb', collection name is 'customers' in our project)
  - have to be ready data.json containing all json data array
  - import data.json into database to execute below command
    mongoimport --db mydb --collection customers --type json --file data.json --jsonArray
3. Setup project
  - just execute below two commands
    npm install
    npm start

------ Phrase 1 -----------------
We need a JSON-based data store (database), with the following requirements:
•	Runs as Windows Service
•	Should not rely on Docker
•	Can be queried via the JSON values
•	Not SQL based
•	Open source