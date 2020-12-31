import React, { Component } from "react";
import { connect } from "react-redux";
import { getSortedData } from "../redux/selectors/index.js";

import {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
} from "../redux/actions/actions.js";

// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";

// import CircularProgress from "@material-ui/core/CircularProgress";
// import Box from "@material-ui/core/Box";
// import TextField from "@material-ui/core/TextField";
// import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import ReactDataGrid from "react-data-grid";

const columns = [
  { key: "id", name: "ID", editable: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true },
];

const rows = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete: 40 },
  { id: 2, title: "Task 3", complete: 60 },
];

class InputTable extends Component {
  state = { rows };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    console.log("RENDER TABLE");
    console.log(this.props);

    // const columns = [
    //   { key: "id", name: "ID" },
    //   { key: "title", name: "Title" },
    //   { key: "count", name: "Count" },
    // ];

    // const rows = [
    //   { id: 0, title: "row1", count: 20 },
    //   { id: 1, title: "row1", count: 40 },
    //   { id: 2, title: "row1", count: 60 },
    // ];
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <ReactDataGrid
              columns={columns}
              rowGetter={(i) => this.state.rows[i]}
              rowsCount={3}
              onGridRowsUpdated={this.onGridRowsUpdated}
              enableCellSelect={true}
            />
          </Paper>
        </Grid>
      </Grid>
      // <Box>
      //   <Container maxWidth="lg">
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //   </Container>
      //   <Container maxWidth="lg">
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //     <TextField id="standard-basic" label="Standard" />
      //   </Container>
      // </Box>
      // <Card className={classes.root}>
      //   {/* <CardHeader
      //     avatar={
      //       <Avatar aria-label="recipe" className={classes.avatar}>
      //         S
      //       </Avatar>
      //     }
      //     title={this.props.name}
      //     subheader="This is the Store where the units are delivered from!"
      //   /> */}
      //   <CardContent>
      //     <Grid container spacing={1}>
      //       {itms.map((itm, index) => {
      //         return (
      //           <Grid item xs>
      //             {this.imageCard(itm)}
      //           </Grid>
      //         );
      //       })}
      //     </Grid>
      //   </CardContent>
      // </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sortedData: { ...getSortedData(state) },
  };
};

export default connect(mapStateToProps, {
  addItemToTransporterAction,
  removeItemFromTransporterAction,
})(InputTable);
