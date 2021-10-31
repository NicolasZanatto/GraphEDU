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

export default function InformacoesDIJKSTRA(){
    const classes = useStyles();

    return (
        <div>
            <h5 className={classes.subTitle}>Algoritmo de DIJKSTRA</h5>
            <p className={classes.content}>
            No algoritmo de Dijkstra enquanto houver algum vértice no qual a distância ainda não foi calculada, é escolhido dentre os disponíveis um vértice em que a distância é mínima. Deste modo, a cada execução da busca, se for encontrado um caminho em que a soma das arestas for menor que a distância atual até o vértice buscado, o caminho até este vértice é atualizado com o novo valor.</p>
        </div>
    );
}