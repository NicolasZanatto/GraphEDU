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

export default function InformacoesBELLMANFORD(){
    const classes = useStyles();

    return (
        <div>
            <h5 className={classes.subTitle}>Algoritmo de BELLMAN FORD</h5>
            <p className={classes.content}>
                o algoritmo de Bellman-Ford tem como objetivo encontrar o menor caminho de um vértice s até todos os outros vértices de um grafo. Além disso, o algoritmo de Bellman-Ford nunca determina que a menor distância foi atingida. Com essa abordagem, é possível calcular caminhos mínimos em grafos que tenham arestas com pesos negativos
            </p>    
        </div>
    );
}