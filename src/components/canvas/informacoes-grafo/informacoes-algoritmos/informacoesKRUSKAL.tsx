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
            O algoritmo de Kruskal, criado por Joseph B. Kruskal em 1956, semelhante ao algoritmo de Prim, 
            tem como objetivo encontrar a árvore geradora mínima através da inserção de arestas de um grafo. 
            Ao contrario do algoritmo de PRIM, durante o processo de construção o grafo gerado não é necessariamente conexo.</p>
        </div>
    );
}