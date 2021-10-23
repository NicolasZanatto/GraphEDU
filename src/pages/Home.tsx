import React from 'react';
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { MenuLateral } from './common/MenuLateral';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fff",
        paddingTop: "1px",
        margin: 0,
        paddingBottom: "200px",
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
        border: "1px solid #eee",
        borderRadius: "5px"
    },
    title: {
        textAlign: "center",
        fontWeight: 300,
        fontSize: "40px",
    },
    subTitle: {
        textAlign: 'justify',
        fontWeight: 100,
        fontSize: "20px",
    },
    link: {
        textDecorationColor: "black"

    },
    button: {
        padding: theme.spacing(6),
        textAlign: 'center',
        color: "black",
        border: "1px solid #ccc",
        borderRadius: "15px",
        fontSize: "16px",
        '&:hover': {
            background: "#52cef7",
        },
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <MenuLateral>
            <div className={classes.root}>
                <Container maxWidth="md">
                    <p className={classes.title}>SISTEMA PARA VISUALIZAÇÃO DE ALGORITMOS DE GRAFOS</p>
                    <p className={classes.subTitle}>Algoritmos de Busca:</p>
                    <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <Link className={classes.link} to='/Algoritmos/DFS'>
                                <Paper className={classes.button}>DFS</Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={classes.link} to='/Algoritmos/BFS'>
                                <Paper className={classes.button}>BFS</Paper>
                            </Link>
                        </Grid>
                    </Grid>
                    <p className={classes.subTitle}>Algoritmos de Caminho Mínimo:</p>
                    <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <Link className={classes.link} to='/Algoritmos/DIJKSTRA'>
                                <Paper className={classes.button}>DIJKSTRA</Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={classes.link} to='/Algoritmos/BELLMANFORD'>
                                <Paper className={classes.button}>BELLMAN FORD</Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={classes.link} to='/Algoritmos/FLOYDWARSHALL'>
                                <Paper className={classes.button}>FLOYD WARSHALL</Paper>
                            </Link>
                        </Grid>
                    </Grid>
                    <p className={classes.subTitle}>Algoritmos de Árvore Geradora Mínima:</p>
                    <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <Link className={classes.link} to='/Algoritmos/PRIM'>
                                <Paper className={classes.button}>PRIM</Paper>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </MenuLateral>
    );
}