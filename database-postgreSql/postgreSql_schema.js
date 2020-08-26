// Step 0: draft schema and review against documentation
// Step 1: create store table
// Step 2: create items table

// DRAFT SCHEMA to be added to db files
CREATE TABLE stores(
  parent_id integer primary key,
  store_Name VARCHAR
  store_Address VARCHAR
  store_PhoneNumber VARCHAR
);

CREATE TABLE products(
  child_id integer primary key,
  parent_id integer not null references stores(parent_id), //link to stores (1 - 1500), randomize among n number of stores
  item_Id VARCHAR
  item_Availability VARCHAR
  item_Price VARCHAR
);