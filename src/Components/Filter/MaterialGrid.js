import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = {
    paper: {
        padding: "2vw",
        textAlign: "center",
        color: "#000000",
        whiteSpace: "nowrap",
        background: "#A0DB9E",
        marginTop: "2vh",
        marginBottom: "2vh"
    }
};
const useStyles = makeStyles(styles);

const MaterialGrid = () => {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>xs=8</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
            </Grid>
        </div>
    );
};
export default MaterialGrid;