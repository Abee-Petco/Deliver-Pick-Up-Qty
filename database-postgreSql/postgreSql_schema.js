// Step 0: draft schema and review against documentation
// Step 1: create store table
// Step 2: create items table

// DRAFT SCHEMA to be added to db files
CREATE TABLE stores(
  store_id INT primary key,
  store_Name VARCHAR,
  store_Address VARCHAR,
  store_PhoneNumber VARCHAR
);

CREATE TABLE products(
  item_Id INT primary key,
  item_Availability BOOL,
  item_Price VARCHAR
);