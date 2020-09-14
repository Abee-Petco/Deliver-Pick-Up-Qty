-- //NOTE: If you need to start completely new, uncommenting and using the following line will wipe out the db and all data in it.
-- //DROP TABLE IF EXISTS deliverpickup

CREATE TABLE stores(
  store_id INT primary key,
  store_Name VARCHAR,
  store_Address VARCHAR,
  store_PhoneNumber VARCHAR
);

CREATE TABLE items(
  item_Id INT primary key,
  item_StoreId INT, 
  item_Availability BOOL,
  item_Price VARCHAR
);

