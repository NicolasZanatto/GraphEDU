import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import PseudoCodigoEditor from './common/PseudoCodigoEditor';

const PrimPseudoCodigo = (props: Props) => {
  const passo = props.simulacao.kruskal.caminho[props.simulacao.passo];
  const algoritmo = `Kruskal(){
    listaAresta = OrdenarArestasPorPeso(E)
    T = {}
    para i de 0 ate listaAresta.tamanho
        e = listaAresta[i]
        se nao_forma_ciclo(T,e)
            T.Adiciona(e)
            se T.tamanho == V.tamanho-1
                return
            fimse
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

export default connector(PrimPseudoCodigo)