import React from "react";
import axios from "axios";
import DefaultLayout from "./Layout/DefaultLayout";
import api from "../api-endpoints/api";

class ItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemNumber: "",
      companyId: "",
      departmentId: "",
      categoryId: "",
      typeId: "",
      subtypeId: "",
      sequence: "",
      companies: [],
      departments: [],
      categories: [],
      types: [],
      subtypes: []
    };
    this.handleDepartmentSelect = this.handleDepartmentSelect.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleSubtypeSelect = this.handleSubtypeSelect.bind(this);
  }

  componentDidMount = () => {
    axios
      .post(api.queryCompanies)
      .then(result => {
        this.setState({ companies: result.data });
        this.setState({ companyId: result.data[0].companyId });
        this.updateItemNumber();
        axios
          .post(api.queryDepartments, {
            num: result.data[0].companyId
          })
          .then(result => {
            this.setState({ departments: result.data });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  handleDepartmentSelect = event => {
    event.preventDefault();
    this.setState({ departmentId: this.refs.department.value }, () => {
      this.setState(
        {
          categoryId: "",
          typeId: "",
          subtypeId: "",
          sequence: "",
          categories: [],
          types: [],
          subtypes: []
        },
        () => {
          this.updateItemNumber();
          this.populateCategories();
        }
      );
    });
  };

  handleCategorySelect = event => {
    event.preventDefault();
    this.setState({ categoryId: this.refs.category.value }, () => {
      this.setState(
        { typeId: "", subtypeId: "", sequence: "", types: [], subtypes: [] },
        () => {
          this.updateItemNumber();
          this.populateTypes();
        }
      );
    });
  };

  handleTypeSelect = event => {
    event.preventDefault();
    this.setState({ typeId: this.refs.type.value }, () => {
      this.setState({ subtypeId: "", sequence: "", subtypes: [] }, () => {
        this.updateItemNumber();
        this.populateSubtypes();
      });
    });
  };

  handleSubtypeSelect = event => {
    event.preventDefault();
    this.setState({ subtypeId: this.refs.subtype.value }, () => {
      this.setState({ sequence: "" }, () => {
        let n =
          this.state.companyId +
          this.state.departmentId +
          this.state.categoryId +
          this.state.typeId +
          this.state.subtypeId;
        this.setState({ itemNumber: n }, () => {
          this.generateSequenceNumber();
        });
      });
    });
  };

  populateCategories = event => {
    axios
      .post(api.queryCategories, {
        num: this.state.departmentId
      })
      .then(result => this.setState({ categories: result.data }))
      .catch(err => console.log(err));
  };

  populateTypes = event => {
    axios
      .post(api.queryTypes, {
        num: this.state.typeId
      })
      .then(result => this.setState({ types: result.data }))
      .catch(err => console.log(err));
  };

  populateSubtypes = event => {
    axios
      .post(api.querySubtypes, {
        num: this.state.subtypeId
      })
      .then(result => this.setState({ subtypes: result.data }))
      .catch(err => console.log(err));
  };

  generateSequenceNumber = event => {
    axios
      .post(api.generateSequenceNumber, { num: this.state.itemNumber })
      .then(result => {
        this.setState({ sequence: result.data.itemNumber }, () =>
          this.updateItemNumber()
        );
      })
      .catch(err => console.log(err));
  };

  updateItemNumber = () => {
    let n =
      this.state.companyId +
      this.state.departmentId +
      this.state.categoryId +
      this.state.typeId +
      this.state.subtypeId;
    this.setState({ itemNumber: n });
  };

  handleItemNumberSubmission = event => {
    event.preventDefault();
    console.log("Submitted new item number");
  };

  render() {
    const renderCompanies = this.state.companies.map((item, i) => {
      return (
        <option key={item.companyId} value={item.companyId}>
          {item.companyName}
        </option>
      );
    });

    const renderDepartments = this.state.departments.map((item, i) => {
      return (
        <option key={item.department_id} value={item.department_id}>
          {item.department_name}
        </option>
      );
    });

    const renderCategories = this.state.categories.map((item, i) => {
      return (
        <option key={item.category_id} value={item.category_id}>
          {item.category_name}
        </option>
      );
    });

    const renderTypes = this.state.types.map((item, i) => {
      return (
        <option key={item.typeId} value={item.typeId}>
          {item.typeName}
        </option>
      );
    });

    const renderSubtypes = this.state.subtypes.map((item, i) => {
      return (
        <option key={item.sub_type_id} value={item.sub_type_number}>
          {item.sub_type_name}
        </option>
      );
    });

    return (
      <DefaultLayout title="Item Entry">
        <div>
          {/* <h1 className="h1 text-center mb-4">New BOM - Basic</h1> */}
          <form onSubmit={this.handleCheckProduct}>
            <div className="row">
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-4 mb-4">
                <label>Comapny</label>
                <select className="form-control" ref="company" disabled>
                  {renderCompanies}
                </select>
              </div>
              <div className="col-sm-4 mb-4">
                <label>Department</label>
                <select
                  className="form-control"
                  ref="department"
                  onChange={this.handleDepartmentSelect.bind(this)}
                  defaultValue="Select Department"
                >
                  <option disabled>Select Department</option>
                  {renderDepartments}
                </select>
              </div>
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-4 mb-4">
                <label>Category</label>
                <select
                  className="form-control"
                  ref="category"
                  onChange={this.handleCategorySelect.bind(this)}
                  defaultValue="Select Category"
                >
                  <option disabled>Select Category</option>
                  {renderCategories}
                </select>
              </div>
              <div className="col-sm-4 mb-4">
                <label>Type</label>
                <select
                  className="form-control"
                  ref="type"
                  onChange={this.handleTypeSelect.bind(this)}
                  defaultValue="Select Type"
                >
                  <option disabled>Select Type</option>
                  {renderTypes}
                </select>
              </div>
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-4 mb-4">
                <label>Subtype</label>
                <select
                  className="form-control"
                  ref="subtype"
                  onChange={this.handleSubtypeSelect.bind(this)}
                  defaultValue="Select Subtype"
                >
                  <option disabled>Select Subtype</option>
                  {renderSubtypes}
                </select>
              </div>
              <div className="col-sm-4 mb-4">
                <label>Units</label>
                <input type="text" className="form-control" ref="uom" />
              </div>
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-4 mb-4">
                <label>Description</label>
                <input type="text" className="form-control" ref="description" />
              </div>
              <div className="col-sm-4 mb-4">
                <label>Remarks</label>
                <input type="text" className="form-control" ref="remarks" />
              </div>
              <div className="col-sm-2 mb-4" />
              <div className="col-sm-4 mb-4" />
              <div className="col-sm-4 mb-4">
                <label>Item Number</label>
                <input
                  type="text"
                  className="form-control"
                  ref="itemNumber"
                  value={this.state.itemNumber + this.state.sequence}
                  disabled
                />
              </div>
              <div className="col-sm-4 mb-4" />
            </div>
          </form>
        </div>
      </DefaultLayout>
    );
  }
}
export default ItemEntry;
