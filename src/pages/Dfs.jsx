import React from 'react';
import Canvas from "../components/canvas/Canvas";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));

export default function Dfs() {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>DFS</Paper>
            </Grid>
            <Grid item xs={6}>
                <Canvas />
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>PseudoCódigo</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>Componente Simulação</Paper>
            </Grid>
        </Grid>
    );
}