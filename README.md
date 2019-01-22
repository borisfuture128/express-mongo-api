Express + MongoDB (Graphql API and REST API based on OData)

## Install project on Windows system 
### 1. Make sure already setup Node and MongoDB in window OS
  If Not, you need to install Node and MongoDB
  - download Node for window
  - download mongodb for window
    to check mongodb successfully, open command prompt and execute like below:
    ```
    -> mongodb
    ```
### 2. Setup MongoDB database for our project
  - create database and collection (database name is 'mydb', collection name is 'customers' in our project)
    open command prompt and execute follow commands:
     ```
      -> mongo 
     ```
     ```
      -> show dbs 
     ```
     ```
      -> use mydb  
     ```
     ```
      -> show collections   
     ```
     ```
      -> db.createCollection("customers")   
     ```
  - have to be ready data.json containing all json data array
  - import data.json into database to execute below command
     ```
     -> mongoimport --db mydb --collection customers --type json --file data.json --jsonArray
     ```

### 3. Install project
  - just execute below two commands
    ```
     -> npm install   
    ```
    ```  
     -> npm start    
    ```   
  - open broswer and go to http://localhost:3000

--------------------------------------------------------------------------------------------------------------
## Graphql APIs
### Introduction : Go to http://localhost:3000/graphql

You can see Graphiql Interface

And input below query
```  
  {
    products(recordType:"SalesProducts"){
      accountId
      recordType
      dateRecorded
    }
  }
```
And click execute button, this wil get all products that "recordType" is same as "SalesProducts"

How to test this API in CURL: Open cmd and enter follows:
```
  curl -X POST -H "Content-Type:application/json" -d "{\"query\":\"{products(recordType:\\\"SalesProducts\\\"){accountId recordType dateRecorded}}\"}" http://localhost:3000/graphql
```
Also can remove or add columns according to what you want to get Json data
```  
  {
    products(recordType:"SalesProducts"){
      recordType
      dateRecorded
    }
  }

``` 
```
  curl -X POST -H "Content-Type:application/json" -d "{\"query\":\"{products(recordType:\\\"SalesProducts\\\"){recordType dateRecorded}}\"}" http://localhost:3000/graphql
```
```  
  {
    products(recordType:"SalesProducts"){
      recordType
      dateRecorded
      data{
        SalesProductId
      }
    }
  }

``` 
```
curl -X POST -H "Content-Type:application/json" -d "{\"query\":\"{products(recordType:\\\"SalesProducts\\\"){recordType dateRecorded data{SalesProductId}}}\"}" http://localhost:3000/graphql
```
```
{
  products(recordType:"SalesProducts"){
    recordType
    dateRecorded
    data{
      SalesProductId
      SalesProductName
      SalesCategoryName
    }
  }
}
```
```
curl -X POST -H "Content-Type:application/json" -d "{\"query\":\"{products(recordType:\\\"SalesProducts\\\"){recordType dateRecorded data{SalesProductId SalesProductName SalesCategoryName}}}\"}" http://localhost:3000/graphql
```
### How to test Graphql API in Postman
For example 
```
{
  products(recordType:"SalesProducts"){
    recordType
    dateRecorded
    data{
      SalesProductId
      SalesProductName
      SalesCategoryName
    }
  }
}
```
- method : POST
- Headers : 
  1. Content-Type : application/json
  2. Accept : application/json
- Body : select raw
  {"query":"{products(recordType:\"SalesProducts\"){recordType dateRecorded data{SalesProductId SalesProductName SalesCategoryName}}}"}
### More Graphql APIs
To get products that contain substring of RecordType
```
{
  products(substringofRecordType:"products"){
    accountId
    recordType
    dateRecorded
    data{
      SalesProductId
      SalesProductName
      SalesCategoryName
    }
  }
}
```
To get products that start with special string of RecordType
```
{
  products(startswithRecordType:"sales"){
    accountId
    recordType
    dateRecorded
    data{
      SalesProductId
      SalesProductName
      SalesCategoryName
    }
  }
}
```
To get products that end with special string of RecordType
```
{
  products(endswithRecordType:"products"){
    accountId
    recordType
    dateRecorded
    data{
      SalesProductId
      SalesProductName
      SalesCategoryName
    }
  }
}
```

--------------------------------------------------------------------------------------------------------------
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