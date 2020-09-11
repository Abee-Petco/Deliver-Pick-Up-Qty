// Step 0: draft schema and review against documentation
// Step 1: create store table
// Step 2: create items table

//NOTE: uncommenting and using the following line will wipe out db and all data in it.
//DROP TABLE IF EXISTS deliverpickup

// DRAFT SCHEMA added to db
CREATE TABLE stores(
  store_id INT primary key,
  store_Name VARCHAR, //newly indexed
  store_Address VARCHAR,
  store_PhoneNumber VARCHAR
);

CREATE TABLE items(
  item_Id INT primary key,
  item_StoreId INT, //utilized via JOIN for READ(get)
  item_Availability BOOL,
  item_Price VARCHAR
);

// -- The following sytntax would prevent any user from having more than one active credit card
// CREATE UNIQUE INDEX concurrently "index_active_credit_cards"
// on credit_cards using btree(user_id) where active is true;

//ask Leslie's advice on multiple stores / itemID (many to many)
//options:
//1) creating a join table?
//2) using an array as value to item_StoreId
//   https://popsql.com/learn-sql/postgresql/how-to-insert-data-into-an-array-in-postgresql
