import React from "react";
import { connect } from "react-redux";
import {
  addItemAction,
  removeItemAction,
  addTransporterAction,
  addItemStoreAction,
  addItemToTransporterAction,
  removeItemFromTransporterAction,
  resetStoreTransporterAction,
} from "../redux/actions/actions.js";

import Button from "@material-ui/core/Button";
// import { DataGrid } from "@material-ui/data-grid";

import { data, columns, baseline } from "../constants/data.js";
import { compareValues } from "../helpers/sort.js";
import Transporter from "./Transporter";
import Store from "./Store";

class Item {
  constructor(id, name, count, weight, utility) {
    this.id = id;
    this.name = name;
    this.count = 1;
    this.weight = weight;
    this.utility = utility;
  }
}

class TransporterClass {
  constructor(id, name, add_weight, driver_weight) {
    this.id = id;
    this.name = name;
    this.add_weight = add_weight;
    this.driver_weight = driver_weight;
    this.weight_left = this.add_weight - this.driver_weight;
    this.items = [];
    this.utility_sum = 0;
    this.weight_sum = this.driver_weight;
  }

  addItem(itm): void {
    const fIndex: number = this.checkItemsFor(itm.name);
    if (fIndex === -1 || this.items.length === 0) {
      let item = new Item(itm.id, itm.name, 1, itm.weight, itm.utility);
      this.items.push(item);
    } else {
      this.items[fIndex].count += 1;
      this.items[fIndex].weight += itm.weight;
      this.items[fIndex].utility += itm.utility;
    }
    this.weight_left -= itm.weight;
    this.utility_sum += itm.utility;
    console.log(this.name + " Weight left:" + this.weight_left);
  }

  removeItem(itm): void {
    const fIndex: number = this.checkItemsFor(itm.name);
    if (fIndex === -1 || this.items.length === 0) {
      // let item = new Item(itm.id, itm.name, 1, itm.weight, itm.utility);
      // this.items.push(item);
    } else {
      this.items[fIndex].count -= 1;
      this.items[fIndex].weight -= itm.weight;
      this.items[fIndex].utility -= itm.utility;
    }
    this.weight_left += itm.weight;
    this.utility_sum -= itm.utility;
    console.log(this.name + " Weight left:" + this.weight_left);
  }

  checkItemsFor(name: string): number {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) {
        return i;
      }
    }
    return -1;
  }
}

class App extends React.Component {
  data_sorted = [];
  constructor(props) {
    super(props);
    this.props.resetStoreTransporterAction([]);

    Object.entries(data).forEach(([k, v]) => {
      v.units = { requested: v.req_units, left: v.req_units };
      v.ratio = { wu: v.weight / v.utility, uw: v.utility / v.weight };
      v.totals = {
        weight: v.req_units * v.weight,
        utility: v.req_units * v.utility,
      };

      v.ratio_wu = v.weight / v.utility;
      v.ratio_uw = v.utility / v.weight;
      this.data_sorted.push(v);
      this.data_sorted = this.data_sorted.sort(
        compareValues("ratio_uw", "desc")
      );
    });
    this.data_sorted.map((object) => this.props.addItemStoreAction(object));

    this.state = {
      columns: columns,
      data_org: data,
      data: this.data_sorted,
      base: baseline,
      items: 0,
    };

    Object.entries(baseline).forEach(([k, v]) => {
      this.props.addTransporterAction(
        new TransporterClass(v.id, v.name, v.add_weight, v.driver)
      );
    });
  }

  addItem = (): void => {
    this.transporter[0].addItem(this.data_sorted[0]);
    this.transporter[1].addItem(this.data_sorted[1]);
    this.store.removeItem(this.data_sorted[0]);
    this.store.removeItem(this.data_sorted[1]);
    this.setState({ items: this.state.items + 1 });
  };
  remItem = (): void => {
    this.transporter[0].removeItem(this.data_sorted[0]);
    this.transporter[1].removeItem(this.data_sorted[1]);
    this.store.addItem(this.data_sorted[0]);
    this.store.addItem(this.data_sorted[1]);
    this.setState({ items: this.state.items - 1 });
  };
  addItemRedux = (): void => {
    console.log("addItemRedux");
    this.props.addItemAction(this.data_sorted[0]);
  };
  removeItemRedux = (): void => {
    console.log("addItemRedux");
    this.props.removeItemAction(this.data_sorted[0]);
  };
  addTransporterRedux = (): void => {
    console.log("addTransporterRedux");
    this.props.addItemToTransporterAction("Transporter 1", "Notebook 13");
  };
  remTransporterRedux = (): void => {
    console.log("addTransporterRedux");
    this.props.removeItemFromTransporterAction("Transporter 1", "Notebook 13");
  };

  render() {
    return (
      <div>
        {/* <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={this.data_sorted}
            columns={this.state.columns}
            pageSize={10}
            // checkboxSelection
          />
        </div> */}
        <div>
          <Store
            name={"Store Bonn"}
          />
        </div>
        <div>
          <Button onClick={this.addItem} variant="contained" color="primary">
            Allocate the Items to the Transporters!
          </Button>
          {/* <Button onClick={this.remItem} variant="contained" color="primary">
            Remove Item
          </Button>
          <Button
            onClick={this.addItemRedux}
            variant="contained"
            color="primary"
          >
            Redux Add Item
          </Button>
          <Button
            onClick={this.removeItemRedux}
            variant="contained"
            color="primary"
          >
            Redux Remove Item
          </Button>
          <Button
            onClick={this.addTransporterRedux}
            variant="contained"
            color="primary"
          >
            Redux Add Transporter Test
          </Button>
          <Button
            onClick={this.remTransporterRedux}
            variant="contained"
            color="primary"
          >
            Redux Remove Transporter Test
          </Button> */}
        </div>
        <div>
          <Transporter name={"Transporter 1"} />
          <Transporter name={"Transporter 2"} />
        </div>
      </div>
    );
  }
}

export default connect(null, {
  addItemAction,
  removeItemAction,
  addTransporterAction,
  addItemStoreAction,
  addItemToTransporterAction,
  removeItemFromTransporterAction,
  resetStoreTransporterAction,
})(App);
