import React from "react";
import axios from "axios";
import DefaultLayout from "./Layout/DefaultLayout";
import api from "../api-endpoints/api";

class NewBom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCheck: false,
      items: [],
      bill: [],
      product: [],
      submission: []
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    let query = this.refs.query.value;
    if (query.length < 1) {
      alert("Please enter an item name or number");
      return;
    }
    axios
      .post(api.queryItem, {
        query
      })
      .then(result => {
        this.setState({ items: result.data });
      })
      .catch(err => console.log(err));
  };

  handleCheckProduct = event => {
    event.preventDefault();
    let query = this.refs.itemNumber.value;
    if (query.length < 1) {
      alert("Enter product number");
      return;
    }
    axios
      .post(api.checkProductExists, {
        query
      })
      .then(result => {
        if (result.data === false) {
          this.setState({ productCheck: true });
          this.setState({
            product: {
              itemNumber: this.refs.itemNumber.value,
              itemName: this.refs.itemName.value,
              itemCode: this.refs.itemCode.value,
              itemDesc: this.refs.itemDesc.value,
              itemUnit: this.refs.itemUnit.value
            }
          });
          alert("Product number OK.");
        } else {
          alert("Product already exists.");
        }
      })
      .catch(err => console.log(err));
  };

  handleAddItem = event => {
    event.preventDefault();
    // if item was already added, increment quantity
    let item = this.state.bill.filter(item => {
      return parseInt(item.itemId) === parseInt(event.target.id);
    });
    if (item.length > 0) {
      item[0].itemQuantity++;
      this.setState(this.state);
      return;
    }

    // find selected item in items array
    let newItem = this.state.items.filter(item => {
      return parseInt(item.itemId) === parseInt(event.target.id);
    });

    // add quantity field to the item object
    newItem[0]["itemQuantity"] = 1;

    // concat selected item to bill array
    this.setState(prevState => ({
      bill: [...prevState.bill, newItem[0]]
    }));
  };

  handleRemoveItem = event => {
    event.preventDefault();
    // filter for items that aren't the selected item
    this.setState({
      bill: this.state.bill.filter(item => {
        return parseInt(item.itemId) !== parseInt(event.target.id);
      })
    });
  };

  handleQuantityChange = event => {
    event.preventDefault();
    // filter for selected item in bill array, increment quantity
    let item = this.state.bill.filter(item => {
      return parseInt(item.itemId) === parseInt(event.target.id);
    });
    item[0].itemQuantity = event.target.value;
    this.setState(this.state);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // check if product already exists
    let query = this.refs.itemNumber.value;
    console.log("item number: " + query);
    if (query.length < 1) {
      alert("Enter item # to check for availability");
      return;
    }
    axios
      .post(api.checkProductExists, {
        query
      })
      .then(result => {
        if (result.data === false) {
          this.setState({ productCheck: true });
          this.setState({
            product: {
              itemNumber: this.refs.itemNumber.value,
              itemName: this.refs.itemName.value,
              itemCode: this.refs.itemCode.value,
              itemDesc: this.refs.itemDesc.value,
              itemUnit: this.refs.itemUnit.value
            }
          });
          let submission = { ...[this.state.product, ...this.state.bill] };
          console.log(submission);
          // prepend new product to bill array, convert to json and submit
          axios
            .post(api.submitBOM, {
              submission
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => console.log(err));
        } else {
          alert("Product already exists.");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const renderBill = this.state.bill.map((item, i) => {
      return (
        <tr key={item.itemId}>
          <td>{item.itemNumber}</td>
          <td>{item.itemName}</td>
          <td>
            <div className="container">
              <input
                type="number"
                id={item.itemId}
                value={item.itemQuantity}
                onChange={this.handleQuantityChange.bind(this)}
                style={{ width: "50px" }}
              />
            </div>
          </td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-sm btn-danger"
              id={item.itemId}
              value={item.itemId}
              onClick={this.handleRemoveItem.bind(this)}
              data-id={item.itemId}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });

    const renderItems = this.state.items.map((item, i) => {
      return (
        <tr key={item.itemId}>
          <td>{item.itemNumber}</td>
          <td>{item.itemName}</td>
          <td>{item.itemUnit}</td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-sm btn-success"
              id={item.itemId}
              value={item.itemId}
              onClick={this.handleAddItem.bind(this)}
              data-id={item.itemId}
            >
              Add
            </button>
          </td>
        </tr>
      );
    });

    return (
      <DefaultLayout title="New BOM">
        <div>
          {/* <h1 className="h1 text-center mb-4">New BOM - Basic</h1> */}
          <h4 className="h4 text-left">Product Entry</h4>
          <form onSubmit={this.handleCheckProduct}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="#"
                ref="itemNumber"
              />
              <input
                type="text"
                className="form-control"
                placeholder="name"
                ref="itemName"
              />
              <input
                type="text"
                className="form-control"
                placeholder="code"
                ref="itemCode"
              />
              <input
                type="text"
                className="form-control"
                placeholder="unit"
                ref="itemUnit"
              />
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="description"
              ref="itemDesc"
            />
            <div className="text-right mt-2">
              <button className="btn btn-dark">Check</button>
            </div>
          </form>

          <div className="mb-3" />

          {/* items added to bill */}
          <div>
            <div style={{ height: "17em", overflowY: "scroll" }}>
              <table className="table table-striped table-bordered table-dark table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Item No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{renderBill}</tbody>
              </table>
            </div>
            <div className="text-right">
              <button className="btn btn-dark" onClick={this.handleFormSubmit}>
                Submit Bill
              </button>
            </div>
          </div>

          <div className="mb-5" />

          {/* search form */}
          <div>
            <form onSubmit={this.handleSearchSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter item name or number"
                  ref="query"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-dark">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mb-2" />

          {/* queried items */}
          <div>
            <div style={{ height: "17em", overflowY: "scroll" }}>
              <table className="table table-striped table-bordered table-dark table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Item No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Unit</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{renderItems}</tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
export default NewBom;
