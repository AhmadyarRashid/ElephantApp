import React from "react";
import axios from "axios";
import DefaultLayout from "./Layout/DefaultLayout";
import api from '../api-endpoints/api';

class SalesForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      forecasts: []
    };
    this.handleForecastSubmit = this.handleForecastSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleForecastSubmit = event => {
    event.preventDefault();
    let data = {
      material_id: this.state.forecast[0][0].material_id,
      year: parseInt(this.refs.year.value),
      jan: parseInt(this.refs.Jan.value),
      feb: parseInt(this.refs.Feb.value),
      mar: parseInt(this.refs.Mar.value),
      apr: parseInt(this.refs.Apr.value),
      may: parseInt(this.refs.May.value),
      jun: parseInt(this.refs.Jun.value),
      jul: parseInt(this.refs.Jul.value),
      aug: parseInt(this.refs.Aug.value),
      sep: parseInt(this.refs.Sep.value),
      oct: parseInt(this.refs.Oct.value),
      nov: parseInt(this.refs.Nov.value),
      dec: parseInt(this.refs.Dec.value)
    };
    axios
      .post(api.submitForecast, {
        data
      })
      .catch(err => console.log(err));
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    let query = this.refs.query.value;
    if (query.length < 1) {
      alert("Please enter an item name, number or year");
      return;
    }
    axios
      .post(api.queryForecast, {
        query
      })
      .then(result => {
        this.setState({ forecasts: result.data });
      })
      .catch(err => console.log(err));
  };

  handleSelectForecast = event => {
    event.preventDefault();
    let forecast = this.state.forecasts.filter(forecast => {
      return parseInt(forecast.forecast_id) === parseInt(event.target.id);
    });
    this.setState({ forecast: [forecast] });
  };

  render() {
    // const renderForecast = this.state.forecast.map((f, i) => {
    //   this.refs.year.value = f[0].year;
    //   this.refs.itemNumber.value = f[0].number;
    //   this.refs.itemName.value = f[0].name;
    //   this.refs.Jan.value = f[0].jan;
    //   this.refs.Feb.value = f[0].feb;
    //   this.refs.Mar.value = f[0].mar;
    //   this.refs.Apr.value = f[0].apr;
    //   this.refs.May.value = f[0].may;
    //   this.refs.Jun.value = f[0].jun;
    //   this.refs.Jul.value = f[0].jul;
    //   this.refs.Aug.value = f[0].aug;
    //   this.refs.Sep.value = f[0].sep;
    //   this.refs.Oct.value = f[0].oct;
    //   this.refs.Nov.value = f[0].nov;
    //   this.refs.Dec.value = f[0].dec;
    // });
    const renderForecasts = this.state.forecasts.map((forecast, i) => {
      return (
        <tr key={forecast.forecast_id}>
          <td>{forecast.year}</td>
          <td>{forecast.number}</td>
          <td>{forecast.name}</td>
          <td className="text-center">
            <button type="button" className="btn btn-sm btn-success" id={forecast.forecast_id} value={forecast.forecast_id} onClick={this.handleSelectForecast.bind(this)} data-id={forecast.forecast_id}>
              Edit
            </button>
          </td>
        </tr>
      );
    });

    return (
      <DefaultLayout title="Sales Forecast">
        <div>
          {/* input forecast for each month */}
          <form onSubmit={this.handleForecastSubmit}>
            <div className="input-group">
              <input type="number" className="form-control" placeholder="Year" ref="year" />
              <input type="text" className="form-control" placeholder="Item No." ref="itemNumber" disabled />
              <input type="text" className="form-control" placeholder="Item Name" ref="itemName" disabled />
            </div>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Jan" ref="Jan" />
              <input type="text" className="form-control" placeholder="Feb" ref="Feb" />
              <input type="text" className="form-control" placeholder="Mar" ref="Mar" />
              <input type="text" className="form-control" placeholder="Apr" ref="Apr" />
              <input type="text" className="form-control" placeholder="May" ref="May" />
              <input type="text" className="form-control" placeholder="Jun" ref="Jun" />
              <input type="text" className="form-control" placeholder="Jul" ref="Jul" />
              <input type="text" className="form-control" placeholder="Aug" ref="Aug" />
              <input type="text" className="form-control" placeholder="Sep" ref="Sep" />
              <input type="text" className="form-control" placeholder="Oct" ref="Oct" />
              <input type="text" className="form-control" placeholder="Nov" ref="Nov" />
              <input type="text" className="form-control" placeholder="Dec" ref="Dec" />
            </div>
            <div className="text-right mt-4">
              <button className="btn btn-dark">Submit Forecast</button>
            </div>
          </form>

          <div className="mb-5" />

          {/* search form */}
          <div>
            <form onSubmit={this.handleSearchSubmit}>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter item name, number or year" ref="query" />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-dark">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mb-2" />

          {/* display sales forcasts */}
          <div>
            <div style={{ height: "17em", overflowY: "scroll" }}>
              <table className="table table-striped table-bordered table-dark table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Item No.</th>
                    <th scope="col">Name</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{renderForecasts}</tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
export default SalesForecast;
