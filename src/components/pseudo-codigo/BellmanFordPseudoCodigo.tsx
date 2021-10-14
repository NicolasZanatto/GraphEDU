import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import PseudoCodigoEditor from './common/PseudoCodigoEditor';

const BellmanFordPseudoCodigo = (props: Props) => {
    const passo = props.simulacao.bellmanford.caminho[props.simulacao.passo];

    const algoritmo = `BellmanFord(verticeInicial){
    para cada v em G
        d[v] = infinito; p[v] = null;
    fimpara
    d[verticeInicial] = 0;
    para i de 1 ate V-1
        para cada aresta (u,v) em G
            tempDistancia = d[u] + peso_aresta(u,v);
            se tempDistancia < d[v]
                d[v] = tempDistancia; p[v] = u;
            fimse
        fimpara
    fimpara
    para cada aresta (u,v) em G
        se d[u] + peso_aresta(u,v) < d[v]
            return "Há Ciclos Negativos"
        fimse
    fimpara
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

export default connector(BellmanFordPseudoCodigo)