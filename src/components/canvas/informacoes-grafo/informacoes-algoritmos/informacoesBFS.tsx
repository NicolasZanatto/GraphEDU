import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(1),
    },
    subTitle: {
        fontWeight: 700,
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)"
    },
    content: {
        color: "rgba(0, 0, 0, 0.54)"
    }
}));

export default function InformacoesBFS(){
    const classes = useStyles();

    return (
        <div>
            <h5 className={classes.subTitle}>Algoritmo BFS</h5>
            <p className={classes.content}>
            No algoritmo de busca em amplitude é realizado a busca de todos os elementos adjacentes ao vértice inicial antes de buscar os outros elementos.
            </p>
        </div>
    );
}