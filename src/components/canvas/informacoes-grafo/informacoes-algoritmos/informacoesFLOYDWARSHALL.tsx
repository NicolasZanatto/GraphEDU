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

export default function InformacoesFLOYDWARSHALL(){
    const classes = useStyles();

    return (
        <div>
            <h5 className={classes.subTitle}>Algoritmo FLOYD WARSHALL</h5>
            <p className={classes.content}>
            O algoritmo de Floyd-Warshall busca encontrar o caminho mínimo entre todos os pares de vértices em um grafo não esparso</p>
        </div>
    );
}