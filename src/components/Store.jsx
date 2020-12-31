import React, { Component } from "react";
import { connect } from "react-redux";
import { getStoreItems } from "../redux/selectors/index.js";

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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

class Store extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   items: [],
    // };
    this.addItem = this.addItem.bind(this);
    this.remItem = this.remItem.bind(this);
  }

  CircularProgressWithLabel = (left, requested) => {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={(left / requested) * 100}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.round((left / requested) * 100)}%`}</Typography>
        </Box>
        <Box
          top={0}
          left={75}
          bottom={0}
          right={0}
          width={100}
          position="absolute"
          display="flex"
          alignItems="left"
          justifyContent="left"
        >
          <Typography variant="caption" component="div" color="textSecondary">
            Left: {left}
            <br />
            Requested {requested}
          </Typography>
        </Box>
      </Box>
    );
  };

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
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Left: {itm.units.left}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Requested:
            {itm.units.requested}
          </Typography> */}
          {this.CircularProgressWithLabel(itm.units.left, itm.units.requested)}
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ArrowUpwardIcon />}
            onClick={() => {
              this.remItem("Transporter 1", itm.name);
            }}
          >
            T1
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ArrowUpwardIcon />}
            onClick={() => {
              this.remItem("Transporter 2", itm.name);
            }}
          >
            T2
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ArrowDownwardIcon />}
            onClick={() => {
              this.addItem("Transporter 1", itm.name);
            }}
          >
            T1
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ArrowDownwardIcon />}
            onClick={() => {
              this.addItem("Transporter 2", itm.name);
            }}
          >
            T2
          </Button>
        </CardActions>
      </Card>
    );
  };

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
    // console.log("RENDER STORE");
    // console.log(this.props.items);
    let itms = [];
    Object.entries(this.props.items).forEach(([k, v]) => {
      itms.push(v);
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
        {/* <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              S
            </Avatar>
          }
          title={this.props.name}
          subheader="This is the Store where the units are delivered from!"
        /> */}
        <CardContent>
          <Grid container spacing={1}>
            {itms.map((itm, index) => {
              return (
                <Grid item xs key={itm.key}>
                  {this.imageCard(itm)}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: { ...getStoreItems(state) },
  };
};

export default connect(mapStateToProps, {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
})(Store);
