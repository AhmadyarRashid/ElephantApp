import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";
import PrivateRoute from "./PrivateRoute";

import NewBom from "../NewBom";
import Home from "../Home";
import ViewBom from "../ViewBom";
import SalesForecast from "../SalesForecast/SalesForecast";
import Login from "../userManagement/auth/Login";
import Register from "../userManagement/auth/Register";
import PurchaseRequisition from "../purchaseRequisition/PurchaseRequisition";
import MaterialEntry from "../MaterialEntry";
import VendersList from "../vendors/VendorsList";
import ViewBOM from "../BOM/ViewBOM";
import SubType from "../ItemMaster/subType/SubType";
import MaterialType from "../ItemMaster/materials/MaterialType";
import Category from "../ItemMaster/categories/Category";
import ItemEntry from "../ItemEntry";
import UsersList from "../userManagement/auth/UsersList";
import Answer from '../Answer';
import Questions from '../Questions';
import Candidate from '../Candidate';

class AppRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/answer" exact component={Answer} />
        <PrivateRoute path="/questions" exact component={Questions} />
        <PrivateRoute path="/candidate" exact component={Candidate} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/users" component={UsersList} />
        <PrivateRoute path="/new_bom" component={NewBom} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/view_bom" component={ViewBom} />
        <PrivateRoute path="/sales_forecast" component={SalesForecast} />
        <PrivateRoute path="/sales-forecast/:type" component={SalesForecast} />
        <PrivateRoute
          path="/purchase-requisition"
          component={PurchaseRequisition}
        />
        <PrivateRoute path="/material-entry" component={MaterialEntry} />
        <PrivateRoute path="/vendors" component={VendersList} />
        <PrivateRoute path="/bom" component={ViewBOM} />
        <PrivateRoute path="/subtypes" component={SubType} />
        <PrivateRoute path="/materials" component={MaterialType} />
        <PrivateRoute path="/categories" component={Category} />
        <PrivateRoute path="/item-entry" component={ItemEntry} />
        <Route
          path="/*"
          component={() => {
            return "Page Not found";
          }}
        />
      </Switch>
    );
  }
}

export default AppRoutes;
