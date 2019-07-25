import React from "react";
import axios from "axios";
import DefaultLayout from "./Layout/DefaultLayout";
import api from '../api-endpoints/api';

class ViewBom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      bill: [],
      product: []
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSelectBill = this.handleSelectBill.bind(this);
  }

  handleSelectBill = event => {
    event.preventDefault();
    let query = event.target.id;
    axios
      .post(api.getBillData, {
        query
      })
      .then(result => {
        this.setState({ product: result.data.product, bill: result.data.rows });
      })
      .catch(err => console.log(err));
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    let query = this.refs.query.value;
    if (query.length < 1) {
      alert("Please enter an item name or number");
      return;
    }
    axios
      .post(api.queryBill, {
        query
      })
      .then(result => {
        this.setState({ bills: result.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const renderProduct = this.state.product.map((product, i) => {
      return (
        <form key={product.itemName}>
          <div className="input-group">
            <input type="text" className="form-control" value={product.itemNumber} disabled />
            <input type="text" className="form-control" value={product.itemName} disabled />
            <input type="text" className="form-control" value={product.itemCode} disabled />
            <input type="text" className="form-control" value={product.itemUnit} disabled />
          </div>
          <input type="text" className="form-control" value={product.itemDesc} disabled />
        </form>
      );
    });

    const renderBill = this.state.bill.map((item, i) => {
      return (
        <tr key={item.itemId}>
          <td>{item.itemNumber}</td>
          <td>{item.itemName}</td>
          <td>{item.itemUnit}</td>
          <td>{item.itemQuantity}</td>
        </tr>
      );
    });

    const renderBills = this.state.bills.map((bill, i) => {
      return (
        <tr key={bill.bomId}>
          <td>{bill.bomId}</td>
          <td>{bill.itemName}</td>
          <td className="text-center">
            <button type="button" className="btn btn-sm btn-success" id={bill.bomId} value={bill.bomId} onClick={this.handleSelectBill} data-id={bill.bomId}>
              View
            </button>
          </td>
        </tr>
      );
    });

    return (
      <DefaultLayout title="View Bills">
        <div>
          {/* view product for searched bill */}
          {renderProduct}

          <div className="mb-3" />

          {/* view items for searched bill */}
          <div>
            <div style={{ height: "15em", overflowY: "scroll" }}>
              <table className="table table-striped table-bordered table-dark table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Item No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>{renderBill}</tbody>
              </table>
            </div>
          </div>

          <div className="mb-5" />

          {/* search form */}
          <div>
            <form onSubmit={this.handleSearchSubmit}>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter bill name, number or items" ref="query" />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-dark">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mb-2" />

          {/* display search results */}
          <div>
            <div style={{ height: "17em", overflowY: "scroll" }}>
              <table className="table table-striped table-bordered table-dark table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Bill ID</th>
                    <th scope="col">Product</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{renderBills}</tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

export default ViewBom;
