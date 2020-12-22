import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransporter } from "../redux/selectors/index.js";
import {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
} from "../redux/actions/actions.js";

class Transporter extends Component {
  id: number = 0;
  name: string = "";

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  render() {
    console.log("RENDER TRANSPORTER " + this.props.name);
    console.log(this.props.transporters);
    let transporter = this.props.transporters[this.props.name];
    let itms = [];
    Object.entries(transporter.items).forEach(([k, v]) => {
      itms.push(v);
    });

    return (
      <div style={{ border: "1px solid red", margin: "3px" }}>
        <div>
          <h2> {this.props.name}</h2>
        </div>
        <div style={{ fontSize: "11px" }}>
          Total Weight: {transporter.add_weight}
          <br />
          Driver's weight: {transporter.driver_weight}
          <br />
          Weight left: {transporter.weight_left}
          <br />
          Utility Sum: {transporter.utility_sum}
          <br />
          Weight Sum: {transporter.weight_sum}
          <br />
          Items: {itms.length}
          <br />
          <br />
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
                      fontSize: "9px",
                    }}
                  >
                    <div>Items: {itm.count}</div>
                    <div style={{ gridColumn: "1/3" }}>
                      Weight Total: {itm.weight} <br /> Utility Total:
                      {itm.utility}
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

// const mapStateToProps = (state) => {
//   const transporter = getTransporter(state);
//   console.log(transporter);
//   return { transporter };
// };
// export default connect(mapStateToProps)(Transporter);

// export default Transporter;

const mapStateToProps = (state) => {
  return {
    transporters: { ...getTransporter(state) },
  };
};
// export default connect(mapStateToProps)(Store);

export default connect(mapStateToProps, {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
})(Transporter);
