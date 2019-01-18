Express + MongoDB

---- Setup project on Windows system -----
1. Make sure already setup Node and Mongo in window OS
  If Not, you need to install Node and MongoDB
  - download Node for window
  - download mongodb for window
    to check mongodb successfully, open command prompt and execute like below:
    ```
    mongodb
    ```
2. Setup MongoDB database for our project
  - create database and collection (database name is 'mydb', collection name is 'customers' in our project)
    open command prompt and execute follow commands:
     ```
      mongo 
     ```
     ```
      show dbs 
     ```
     ```
      use mydb  
     ```
     ```
      show collections   
     ```
     ```
      db.createCollections("customers")   
     ```
  - have to be ready data.json containing all json data array
  - import data.json into database to execute below command
     ```
     > mongoimport --db mydb --collection customers --type json --file data.json --jsonArray
     ```

3. Setup project
  - just execute below two commands
    ```
     -> npm install   
    ```
    ```  
     -> npm start    
    ```   
  - open broswer and go to http://localhost:3000


Phase I – Data store selection
We need a JSON-based data store (database), with the following requirements:
•	Runs as Windows Service
•	Should not rely on Docker
•	Can be queried via the JSON values
•	Not SQL based
•	Open source
We will provide sample data to you to prototype. Every JSON object will have the following attributes:
•	AccountId
•	Type
The rest of the data will be generally based upon the Type, again, as JSON.

------------------
Phase II – Expose data via OData or GraphQL (or similar)
Expose this data via a flexible API which returns result data as JSON. Implement security sufficient to not allow open access to the API. Prefer using NodeJS/Express or similar technology for the API.

------------------
Phase III – Accept data via API to update/overwrite data in the data store
Export a new API that allows pushing of updated data which will handle wiping and re-inserting said data to the data store as a transaction. Ideal to perform this synchronously, for now, although if better to do asynchronously, that’s fine.