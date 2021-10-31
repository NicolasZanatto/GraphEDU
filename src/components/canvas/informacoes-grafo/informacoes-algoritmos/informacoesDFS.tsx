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

export default function InformacoesDFS(){
    const classes = useStyles();

    return (
        <div>
            <h5 className={classes.subTitle}>Algoritmo DFS</h5>
            <p className={classes.content}>
                A ideia da DFS é a partir de um vértice inicial, escolher uma aresta e a partir dela percorrer o mais "fundo" possível todos os vértices acessíveis antes de verificar a próxima aresta.
            </p>
        </div>
    );
}