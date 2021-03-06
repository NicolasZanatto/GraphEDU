import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import PseudoCodigoEditor from './common/PseudoCodigoEditor';

const PrimPseudoCodigo = (props: Props) => {
  const passo = props.simulacao.prim.caminho[props.simulacao.passo];
  const algoritmo = `Prim(s){
    para cada v em V
        d[v] = infinito
    fimpara
    d[s] = 0
    U = vazio
    para i de 1 até V.tamanho
        u = um vértice que não está em U, no qual d[u] é a distância mínima
        U.coloca(u)
        para cada v adjacente a u
            se U.nao_contem(v) && peso_aresta(u,v) < d[v]
                d[v] = peso_aresta(u,v); pai[v] = u;
            fimse
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

export default connector(PrimPseudoCodigo)