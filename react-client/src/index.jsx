import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DeliverPickup from './DeliverPickup.jsx'
import config from '../../config.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemAvailability: [{
        storeName: 'N Walnut Creek',
        storeAddress: '2820 Ygnacio Valley Rd Walnut Creek, CA 94598',
        storePhoneNumber: '925-433-4194',
        availability: true
      }],
      itemPrice: 22,
      itemCurrency: "$"
    }
  }

  componentDidMount() {
    console.log('CompDidMount pulls Item id', this.props.itemId);
    let itemId = this.props.itemId;
    console.log('Client: compDidMount itemId var = ', itemId);
    $.ajax({
      url: config.itemPrice + this.props.itemId,
      type: "get",
      success: (data) => {
        console.log('Data returned from the title and price service', data);
        if (data) {
          this.setState({
            itemPrice: data.price,
            itemCurrency: data.currency
          })
        }
      },
      error: (error) => {
        console.log('Client: ajax call error', error);
        this.setState({
          itemPrice: ' check with store',
          itemCurrency: '$'
        })
      }
    })
    let url = config.availableAt + this.props.itemId;
    console.log('url being called for availAt by client: ', url);
    $.ajax({
      url: config.availableAt + this.props.itemId,
      type: "get",
      success: (data) => {
        console.log('Data returned from the server', data.itemAvailability[0].storeName);
        this.setState({
          itemAvailability: data.itemAvailability
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  render() {
    let defaultStore = this.state.itemAvailability ? this.state.itemAvailability[0] : null;
    return (
      (defaultStore && this.state.itemPrice)
        ? <DeliverPickup availability={defaultStore} price={this.state.itemPrice} currency={this.state.itemCurrency} />
        : null
    );
  }
}

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('itemID');
ReactDOM.render(<App itemId={itemId} />, document.getElementById('itemAvailability'));
