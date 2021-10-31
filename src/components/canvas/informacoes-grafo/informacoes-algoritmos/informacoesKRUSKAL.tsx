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

export default function InformacoesKRUSKAL(){
    const classes = useStyles();

    return (
        <div>
            <h5 className={classes.subTitle}>Algoritmo KRUSKAL</h5>
            <p className={classes.content}>
            O algoritmo de Kruskal, criado por Joseph B. Kruskal em 1956, ao contrário do algoritmo de Prim, tem como objetivo encontrar a árvore geradora mínima através da inserção de arestas de um grafo. Enquanto a árvore não é finalizada, ela é de fato uma floresta. Visto que para cada aresta inserida não é obrigatória estar conectada a outra aresta da árvore</p>
        </div>
    );
}