import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  addItemAction,
  removeItemAction,
  addTransporterAction,
  addItemStoreAction,
  addItemToTransporterAction,
  removeItemFromTransporterAction,
  resetStoreTransporterAction,
  initDataAction,
  setSortedDataAction,
} from "../redux/actions/actions.js";
import {
  getSortedData,
  getStoreItems,
  getTransporter,
} from "../redux/selectors/index.js";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
// import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { data, columns, baseline } from "../constants/data.js";
import { compareValues } from "../helpers/sort.js";
import Transporter from "./Transporter";
import Store from "./Store";

class App extends React.Component {
  data_sorted = [];
  constructor(props) {
    super(props);
    this.props.resetStoreTransporterAction([]);
    this.props.initDataAction(data);
    Object.entries(data).forEach(([k, v]) => {
      v.units = {
        requested: v.req_units,
        left: v.req_units,
        original: v.req_units,
      };
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
    this.props.setSortedDataAction(this.data_sorted);

    this.state = {
      columns: columns,
      data_org: data,
      data: this.data_sorted,
      base: baseline,
      items: 0,
    };

    Object.entries(baseline).forEach(([k, v]) => {
      this.props.addTransporterAction({
        id: v.id,
        name: v.name,
        add_weight: v.add_weight,
        driver_weight: v.driver,
        weight_left: Number(v.add_weight - v.driver),
        items: [],
        utility_sum: 0,
        weight_sum: v.driver,
        img: v.img,
      });
    });
    //this.allocateItemsNow();
  }

  allocateItemsNow = (): void => {
    console.log(this.props);
    const { transporter, storeItems, sortedData } = this.props;
    console.log(transporter, storeItems, sortedData);

    let itemsSortedNames = [];
    let transporterNames = [];
    Object.values(sortedData).forEach((v) => {
      itemsSortedNames.push(v.name);
    });
    Object.values(transporter).forEach((v) => {
      transporterNames.push(v.name);
    });

    // Allocate the parts first highest utility first
    let j: number = 0;
    for (let name of transporterNames) {
      let tmpTransporter = transporter[name];
      let i: number = 0;
      while (tmpTransporter.weight_left > 0) {
        let itm = storeItems[itemsSortedNames[j]];

        if (tmpTransporter.weight_left - itm.weight > 0) {
          this.props.addItemToTransporterAction(name, itm.name);
        } else {
          //but is there another part which can be added directly to maximize utility?
          break;
        }

        if (itm.units.left < 1) {
          j++;
        }
        i++;
        if (i > 10000) break;
      }
    }

    // // Take a closer look!
    // for (let name of transporterNames) {
    //   let tmpTransporter = transporter[name];
    //   let i: number = 0;
    //   while (tmpTransporter.weight_left > 0) {
    //     for (let itmName of itemsSortedNames) {
    //       let itm = storeItems[itmName];
    //       if (itm.units.left > 0) {
    //         if (tmpTransporter.weight_left - itm.weight >= 0) {
    //           this.props.addItemToTransporterAction(name, itm.name);
    //         } else {
    //           // what is the difference?
    //           console.log('this is the diff', tmpTransporter);
    //           //minimize weight
    //           //maximize utility
    //         }
    //       }
    //     }

    //     i++;
    //     if (i > 10000) break;
    //   }
    // }

    // let j: number = 0;
    // let i: number = 0;
    // while (
    //   transporter[transporterNames[0]].weight_left > 0 &&
    //   transporter[transporterNames[1]].weight_left > 0
    // ) {
    //   let itm = storeItems[itemsSortedNames[j]];
    //   if (
    //     transporter[transporterNames[0]].weight_left - itm.weight > 0 &&
    //     itm.units.left >= 1
    //   ) {
    //     this.props.addItemToTransporterAction(transporterNames[0], itm.name);
    //   }
    //   if (
    //     transporter[transporterNames[1]].weight_left - itm.weight > 0 &&
    //     itm.units.left > 0
    //   ) {
    //     this.props.addItemToTransporterAction(transporterNames[1], itm.name);
    //   }
    //   if (itm.units.left < 1) {
    //     j++;
    //   }

    //   i++;
    //   if (i > 10000) {
    //     console.log("EXIT");
    //     break;
    //   }
    // }
  };

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        width: "100%",
      },
      heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
      },
    }));

    return (
      <Fragment>
        <CssBaseline />

        <Container maxWidth="xl">
          <h2>BWI Coding Challenge</h2>
          <Button
            onClick={this.allocateItemsNow}
            variant="contained"
            color="primary"
          >
            Allocate the Items to the Transporters!
          </Button>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              aria-label="Expand"
            >
              <Avatar
                aria-label="recipe"
                className={classes.large}
                src="/images/store_bonn.png"
              />
              <Typography className={classes.heading}>Store Bonn</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Store name={"Store Bonn"} />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              aria-label="Expand"
            >
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src="/images/transporter.png"
              />
              <Typography className={classes.heading}>
                Transporter Fleet
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Transporter name={"Transporter 1"} />
                </Grid>
                <Grid item xs={12}>
                  <Transporter name={"Transporter 2"} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sortedData: { ...getSortedData(state) },
    storeItems: { ...getStoreItems(state) },
    transporter: { ...getTransporter(state) },
  };
};

export default connect(mapStateToProps, {
  addItemAction,
  removeItemAction,
  addTransporterAction,
  addItemStoreAction,
  addItemToTransporterAction,
  removeItemFromTransporterAction,
  resetStoreTransporterAction,
  initDataAction,
  setSortedDataAction,
})(App);
