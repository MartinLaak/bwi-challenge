import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getStoreItems } from "../redux/selectors/index.js";

import {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
} from "../redux/actions/actions.js";

class Store extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   items: [],
    // };
    this.addItem = this.addItem.bind(this);
    this.remItem = this.remItem.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  addItem = (t, itm) => {
    console.log(t, itm);
    this.props.addItemToTransporterAction(t, itm);
  };
  remItem = (t, itm) => {
    console.log(t, itm);
    this.props.removeItemFromTransporterAction(t, itm);
  };

  render() {
    console.log("RENDER STORE");
    console.log(this.props.items);
    let itms = [];
    Object.entries(this.props.items).forEach(([k, v]) => {
      itms.push(v);
    });
    return (
      <div style={{ border: "2px solid blue", margin: "3px" }}>
        <div>
          <h2> Name: {this.props.name}</h2>
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "250px 250px",
              gridTemplateColumns: "20% 20% 20% 20%",
              gridGap: "5px 5px",
              gridAutoFlow: "column",
            }}
          >
            {itms.map((itm, index) => {
              return (
                <div style={{ border: "1px solid gray", margin: "5px" }}>
                  <h3>{itm.name}</h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: "50px 50px 20px",
                      gridTemplateColumns: "50% 50%",
                      gridGap: "5px 5px",
                      gridAutoFlow: "row",
                      margin: "5px",
                      fontSize: "10px",
                    }}
                  >
                    <div>Left: {itm.units.left}</div>
                    <div>
                      Requested:
                      {itm.units.requested}
                    </div>
                    <div style={{ gridColumn: "1/3" }}>
                      Item Weight: {itm.weight} | Item Utility: {itm.utility}
                      <br />
                      Weight Total: {itm.totals.weight} <br />
                      Utility Total: {itm.totals.utility}
                    </div>
                    <div style={{ gridColumn: "1/3" }}>
                      <Button
                        onClick={() => this.addItem("Transporter 1", itm.name)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        T1+
                      </Button>
                      <Button
                        onClick={() => this.addItem("Transporter 2", itm.name)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        T2+
                      </Button>
                      <Button
                        onClick={() => this.remItem("Transporter 1", itm.name)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        T1-
                      </Button>
                      <Button
                        onClick={() => this.remItem("Transporter 2", itm.name)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        T2-
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

//export default Store;

const mapStateToProps = (state) => {
  return {
    items: { ...getStoreItems(state) },
  };
};
// export default connect(mapStateToProps)(Store);

export default connect(mapStateToProps, {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
})(Store);
