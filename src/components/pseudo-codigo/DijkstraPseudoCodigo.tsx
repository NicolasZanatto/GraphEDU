import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import PseudoCodigoEditor from './common/PseudoCodigoEditor';

const DijkstraPseudoCodigo = (props: Props) => {
    const passo = props.simulacao.dijkstra.caminho[props.simulacao.passo];
    const algoritmo = `Dijkstra(verticeInicial){
    para cada v em G
        d[v] = infinito
    fimpara
    d[verticeInicial] = 0
    Q = Vertices que a distância ainda não foi calculada
    enquanto Q != vazio
        u = um vértice em Q, no qual d[u] é a distância mínima
        se u == verticeFinal
            return;
        para cada v adjacente a u
            se v está em Q
                e = aresta(u,v);
                se d[v] &gt; d[u] + l[e]
                    d[v] = d[u] + l[e]
                fimse
            fimse
        fimpara
        Q.remove(u)
    fimenquanto
}`;
    return (
        <PseudoCodigoEditor algoritmo={algoritmo} linha={passo?.linha} />
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(DijkstraPseudoCodigo)