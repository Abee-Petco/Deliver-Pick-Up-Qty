# deliver-pickup

## Related Projects

- https://github.com/PetToyCo/mainTitle_price
- https://github.com/PetToyCo/reviews
- https://github.com/PetToyCo/photo-gallery
- https://github.com/PetToyCo/kate-proxy-server
- https://github.com/PetToyCo/mainTitle_price
- https://github.com/PetToyCo/ProductRecommendations

## Table of Contents
  1. Usage
  2. Endpoints
  3. Proxy Integration

## Usage

Please Note: This service is currently in Production mode.
if you need to return it to development mode, go to config.js file:
[C] comment aws configuration and uncomment the local one.

This service is meant to be used with a proxy server. If that is your intended use:

- run `npm install` inside the photo-gallery directory to install dependencies
- run `npm run seed` (to seed the database)
- run `npm test` (to test seeding script, api endpoints and react components)
- start your application with two commands, `npm run client` and `npm start`, in two separate terminal tabs

If you need to use this service as standalone:

- follow all steps above
- visit http://127.0.0.1:3006/ in a browser
- add a query string parameter `itemID` to your url. Pick itemID within the range 100 - 199.
Example: `http://127.0.0.1:3006/?itemID=106`

## Endpoints:

This service has four endpoints.

### CREATE:

Endpoint: '/newStore/'

Development URL: http://localhost:3006/newStore/

Route type:  POST

Summary: Endpoint takes in parameters in the following JSON key, value format:

{
    "storeName" : "Hancock Center",
    "storeAddress" : "1000 E 41st St, Austin, TX 78751",
    "storePhoneNumber" : "(512) 419-0311"
}

Response: returns a new store object with database generated id included in the following JSON response format:

{
    "_id": "5f42c47d618c0a6e8a640391",
    "storeName": "Hancock Center",
    "storeAddress": "1000 E 41st St, Austin, TX 78751",
    "storePhoneNumber": "(512) 419-0311",
    "__v": 0
}

### READ:

Endpoint: '/availableAt/:itemId/'

Development URL: http://localhost:3006/availableAt/:itemId/

Route type:  GET

Summary: Endpoint takes in an itemId in numerical format between 1 - 100 (soon to be 1 - 1MM):

itemId=177

Sample localhostURL:
localhost:3006/availableAt/?itemId=177

Response: returns an array of stores and item availability at each store.

JSON response format:

{"itemAvailability":[
	{"storeName":"N Walnut Creek",
	"storeAddress":"2820 Ygnacio Valley Rd Walnut Creek, CA 94598",
	"storePhoneNumber":"925-433-4194",
	"availability":true},
	{"storeName":"Walnut Creek",
	"storeAddress":"1301 S. California Blvd Walnut Creek, CA 94596-5124",
	"storePhoneNumber":"925-988-9370",
	"availability":true},
	...]
}

### UPDATE:

Endpoint: '/updateStoreDetails/'

Development URL: http://localhost:3006/updateStoreDetails/

Route type:  PUT

Summary: Endpoint takes in parameters in the following JSON key, value format:

{
"storeName" : "Union Square",
"storeAddress" : "860 Broadway, New York, NY 10003",
"storePhoneNumber" : "222-222-2222"
}

NOTE: Ensure all fields are reviewed, updated if needed, and included in request.


Response: returns an updated store object in the following JSON response format:

{
"_id" : ObjectId("5f400c2e5cdb129b4e66f092"),
"storeName" : "Union Square",
"storeAddress" : "860 Broadway, New York, NY 10003",
"storePhoneNumber" : "222-222-2222"
}

### DELETE:

Endpoint:  '/deleteStore/'

Development URL: http://localhost:3006/deleteStore/?storeName=Northwest DC

Route type:  DELETE

Summary: Endpoint takes in a store name in the following key, value format:

{
"storeName" : "Northwest DC"
}

Response: returns the deleted store object in the following JSON response format:

{
    "_id": "5f40322cd3411237ff8cc5cc",
    "storeAddress": "3100 14th St NW, Washington, DC 20010",
    "storePhoneNumber": "(202) 332-0010",
    "storeName": "Northwest DC",
    "__v": 0
}


## Proxy Integration

Production mode:

To use this service with a proxy server, please add `<div id="itemAvailability"></div>` in index.html of your proxy server, and please add <script src="http://18.224.229.28:3006/bundle.js"></script> near the bottom of the same file. Also you will need to place `<link rel="stylesheet" href="http://18.224.229.28:3006/style.css"></link>` file in the head of your html file.

Development mode:

To use this service with a proxy server, please add `<div id="itemAvailability"></div>` in index.html of your proxy server, and please add <script src="http://localhost:3006/bundle.js"></script> near the bottom of the same file. Also you will need to place `<link rel="stylesheet" href="http://localhost:3006/style.css"></link>` file in the head of your html file.
