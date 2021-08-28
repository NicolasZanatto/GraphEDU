import React from 'react';
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#eee",
        margin: 0,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    title: {
        textAlign: "center",
        fontWeight: 300,
        fontSize: "40px",
    },
    button: {
        padding: theme.spacing(6),
        textAlign: 'center',
        color: theme.palette.text.primary,
        borderRadius: "15px",
        fontSize: "20px",
        '&:hover': {
            background: "#0390fc",
        },
        border: "solid"
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="md">
                <p className={classes.title}>SISTEMA PARA VISUALIZAÇÃO DE ALGORITMOS DE GRAFOS</p>
                <Grid container xs={8} spacing={8}>
                    <Grid item xs={6}>
                        <Link to='/Algoritmos/DFS'>
                            <Paper className={classes.button}>DFS</Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.button}>BFS</Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}