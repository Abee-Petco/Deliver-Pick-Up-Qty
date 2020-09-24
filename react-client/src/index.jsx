import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DeliverPickup from './DeliverPickup.jsx'
//import config from '../../config.js'
import axios from 'axios';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemAvailability: {
        storeName: 'N Walnut Creek',
        storeAddress: '2820 Ygnacio Valley Rd Walnut Creek, CA 94598',
        storePhoneNumber: '925-433-4194',
        availability: true,
        itemPrice: '22',
        itemCurrency: "$"
      }
    }

  }

  fetchItemAvailability(itemId) {

    let requestURL = `http://localhost:3006/availableAt/${itemId}`;
    console.log('productId from URL is: ', itemId);
    console.log('url being called for availAt by client: ', requestURL);

    return axios.get(requestURL)
      .then((response) => {
        let data = response.data;
        return data;
      })
      .catch((err) => {
        return [];
      });
  }

  getProductId(path, method) {
    (console.log('path and method are passed: ', path, method))
    let productId;
    console.log('split: ', path.split('/'))
    if (method === 'queryParam') {
      console.log('it sees it as a queryParam')
      return Number(path.split('=')[1]);
    }
    if (method === 'value') {
      console.log('it sees a value')
      return Number(path.split('/')[1]);
    }
  }

  getProductIdFromUrl() {
    console.log('window pathname captured: ', window.location.pathname);
    if (window.location.pathname === '/') {
      return 100;
    } else if (window.location.pathname === "/product") {
      return this.getProductId(window.location.search, 'queryParam')
    } else {
      return this.getProductId(window.location.pathname, 'value');
    }
  }

  componentDidMount() {

    let itemId = this.getProductIdFromUrl();
    console.log('Client: compDidMount itemId var = ', itemId);

    let itemAvailability = this.state.itemAvailability;
    console.log('itemAvail before component did mount complete: ', itemAvailability);
    this.fetchItemAvailability(itemId)
      .then(res => {
        let itemAvailibilityFetched = res.itemAvailability;
        console.log('client gets store data back: ', itemAvailibilityFetched)
        this.setState({
          itemAvailability: itemAvailibilityFetched
        })
      })
      .catch((err) => {
        console.log('Error saving state:', err);
      });
    console.log('component did mount complete');
  }

  render() {
    //let defaultStore = this.state.itemAvailability ? this.state.itemAvailability[0] : null;
    if (!this.state)
    return (null);

    return (
      <DeliverPickup store={this.state.itemAvailability} />
    );
  }
}

// const urlParams = new URLSearchParams(window.location.search);
// const itemId = urlParams.get('itemID');

ReactDOM.render(<App />, document.getElementById('itemAvailability'));

// (this.state.itemAvailability && this.state.itemPrice)
// ?