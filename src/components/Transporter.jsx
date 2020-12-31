import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTransporter } from "../redux/selectors/index.js";
import {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
} from "../redux/actions/actions.js";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

class Transporter extends Component {
  id: number = 0;
  name: string = "";

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  imageCard = (itm) => {
    const classes = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
        backgroundColor: "aquamarine",
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
      },
      avatar: {
        backgroundColor: red[500],
      },
    }));

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={itm.img}
            />
          }
          title={itm.name}
          subheader={`Weight: ${itm.weight} g | Utility: ${itm.utility}`}
          className={classes.cardheader}
        />
        <CardMedia className={classes.media} image={itm.img} title={itm.name} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Items: {itm.count}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Weight Total: {itm.totals.weight} <br /> Utility Total:{" "}
            {itm.totals.utility}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => {
              this.remItem(this.props.name, itm.name);
            }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <IconButton
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => {
              this.addItem(this.props.name, itm.name);
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  addItem = (t, itm) => {
    console.log(t, itm);
    this.props.addItemToTransporterAction(t, itm);
  };
  remItem = (t, itm) => {
    console.log(t, itm);
    this.props.removeItemFromTransporterAction(t, itm);
  };

  render() {
    // console.log("RENDER TRANSPORTER " + this.props.name);
    // console.log(this.props.transporters);
    let transporter = this.props.transporters[this.props.name];
    let itms = [];
    let totalItems: number = 0;
    Object.entries(transporter.items).forEach(([k, v]) => {
      itms.push(v);
      totalItems += v.count;
    });

    const classes = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
        backgroundColor: "aquamarine",
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
      },
      avatar: {
        backgroundColor: red[500],
      },
    }));

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={transporter.img}
            />
          }
          title={this.props.name}
          subheader={
            <Fragment>
              <Fragment>
                Total Weight: {transporter.add_weight / 1000}kg
              </Fragment>
              <br />
              <Fragment>
                Driver's weight: {transporter.driver_weight / 1000}kg
              </Fragment>
            </Fragment>
          }
        />
        {/* <div style={{ border: "1px solid red", margin: "3px" }}> */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Weight left: {transporter.weight_left / 1000}kg | Utility Sum:{" "}
            {transporter.utility_sum} | Weight Sum:{" "}
            {transporter.weight_sum / 1000}kg | Items Types: {itms.length} |
            Total Items: {totalItems}
          </Typography>

          <Grid container spacing={1}>
            {itms.map((itm, index) => {
              return (
                <Grid item xs={2} key={itm.name.replace(/ /g, '')}>
                  {this.imageCard(itm)}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
        {/* </div> */}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transporters: { ...getTransporter(state) },
  };
};

export default connect(mapStateToProps, {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
})(Transporter);
