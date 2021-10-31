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

export default function InformacoesPRIM(){
    const classes = useStyles();

    return (
        <div>
            <h5 className={classes.subTitle}>Algoritmo PRIM</h5>
            <p className={classes.content}>
            O algoritmo de Prim se caracteriza pela construção iterativa da solução, a cada passo um vértice é escolhido para ser incluído na árvore geradora</p>
        </div>
    );
}