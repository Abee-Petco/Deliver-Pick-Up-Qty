import React from 'react';

const DeliverPickup = (props) => {

  let storeData = props.store;
  let price = storeData.itemPrice;
  let currency = storeData.itemCurrency;
  let available = storeData.availability;
  let storeName = storeData.storeName;

  return (
    <div className="deliveryPickupContainers">
      <div className="deliverPickup">
        <div className="deliverPickupHeader">Deliver it To Me</div>
        <div className="deliverPickupItemPrice">{currency}{price}</div>
        <div className="deliverText">
          <div className="deliveryTruck"></div> Order now to get it by <span className="deliveryDate">Wednesday, Nov 22</span>
        </div>
        <button className="deliverPickupButton">Add to Cart</button>
        <div className="addToWishlistDiv">
          <a className="addToWishlist">Add to Wishlist</a>
        </div>
      </div>
      <div className="deliverPickup">
        <div className="deliverPickupHeader">I'll Pick It Up</div>
        <div className="cubsidePickup">
          <strong>10% off – See Price in Cart!</strong> Curbside pickup now available in most locations.
      </div>
        <div className="deliverPickupItemPrice">{currency}{price}</div>
        <div className={`itemAvailability ${available ? 'itemAvailabilityGreen' : 'itemAvailabilityRed'}`}>{available ? "Available at:" : "Not Available at:"}</div>
        <div className="localStoreAvailability">
          <span className="pickupStoreName">{storeName.toUpperCase()}</span>
          <a className="changeStore">Change Store</a>
        </div>
        <button disabled={!available} className="deliverPickupButton">{available ? "Add to Cart" : "Not Available"}</button>
      </div>
    </div>
  )

};

export default DeliverPickup;
