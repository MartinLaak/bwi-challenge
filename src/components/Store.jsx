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
// import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Store extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   items: [],
    // };
    this.addItem = this.addItem.bind(this);
    this.remItem = this.remItem.bind(this);
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
            Left: {itm.units.left}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Requested:
            {itm.units.requested}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton className={classes.expand} aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
          <IconButton className={classes.expand} aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
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
    console.log("RENDER STORE");
    console.log(this.props.items);
    let itms = [];
    Object.entries(this.props.items).forEach(([k, v]) => {
      itms.push(v);
    });
    return (
      <div
        style={{
          // border: "2px solid blue",
          margin: "5px",
          padding: "20px",
          background: "rgb(199 203 255 20%)",
          borderRadius: "4px",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          // boxShadow: "3px 3px 5px 2px #000000cc",
        }}
      >
        <div>
          <h2> Name: {this.props.name}</h2>
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: "20px 20px",
            }}
          >
            {itms.map((itm, index) => {
              return this.imageCard(itm);
              // return (
              //   <div
              //     style={{
              //       border: "1px solid #dddddd",
              //       margin: "0px",
              //       background: "rgb(255 171 40 / 38%)",
              //       borderRadius: "4px",
              //       boxShadow:
              //         "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              //     }}
              //   >
              //     <div>
              //       {/* <div> */}
              //       <img
              //         style={{
              //           width: "40px",
              //           height: "40px",
              //           border: "1px solid #dddddd",
              //           margin: "5px",
              //           background: "rgb(255 171 40 / 38%)",
              //           borderRadius: "50%",
              //           boxShadow:
              //             "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              //           objectFit: "cover",
              //         }}
              //         src={itm.img}
              //         alt="Cat"
              //       />
              //       <h3>{itm.name}</h3>
              //       {/* </div> */}
              //     </div>
              //     <div
              //       style={{
              //         display: "grid",
              //         gridTemplateRows: "1fr 1fr 1fr",
              //         gridTemplateColumns: "50% 50%",
              //         gridGap: "5px 5px",
              //         gridAutoFlow: "row",
              //         margin: "5px",
              //         fontSize: "10px",
              //       }}
              //     >
              //       <div>Left: {itm.units.left}</div>
              //       <div>
              //         Requested:
              //         {itm.units.requested}
              //       </div>
              //       <div style={{ gridColumn: "1/3" }}>
              //         Item Weight: {itm.weight} <br />
              //         Item Utility: {itm.utility} <br />
              //         Weight Total: {itm.totals.weight} <br />
              //         Utility Total: {itm.totals.utility}
              //       </div>
              //       <div style={{ gridColumn: "1/3" }}>
              //         <Button
              //           onClick={() => this.addItem("Transporter 1", itm.name)}
              //           variant="contained"
              //           color="primary"
              //           size="small"
              //         >
              //           T1+
              //         </Button>
              //         <Button
              //           onClick={() => this.addItem("Transporter 2", itm.name)}
              //           variant="contained"
              //           color="primary"
              //           size="small"
              //         >
              //           T2+
              //         </Button>
              //         <Button
              //           onClick={() => this.remItem("Transporter 1", itm.name)}
              //           variant="contained"
              //           color="primary"
              //           size="small"
              //         >
              //           T1-
              //         </Button>
              //         <Button
              //           onClick={() => this.remItem("Transporter 2", itm.name)}
              //           variant="contained"
              //           color="primary"
              //           size="small"
              //         >
              //           T2-
              //         </Button>
              //       </div>
              //     </div>
              //   </div>
              // );
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
