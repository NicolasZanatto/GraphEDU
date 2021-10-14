import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import PseudoCodigoEditor from './common/PseudoCodigoEditor';

const FloydWarshallPseudoCodigo = (props: Props) => {
    const passo = props.simulacao.floydWarshall.caminho[props.simulacao.passo];
    const algoritmo = `FloydWarshall(){
    para i de 1 até N
        para j de 1 até N
            se existe aresta(i,j)
                dist(i,j) = peso_aresta(i,j); p(i,j) = i;
            senao
                dist(i,j) = infinito
            fimse
        fimpara
    fimpara
    para k de 1 ate N
        para i de 1 ate N
            para j de 1 ate N
                se dist(i,j) > dist(i,k) + dist(k,j)
                    dist(i,j) = dist(i,k) + dist(k,j); p(i,j) = p(k,j);
                fimse
            fimpara
        fimpara
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

export default connector(FloydWarshallPseudoCodigo)