import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import PseudoCodigoEditor from "./common/PseudoCodigoEditor";

const DFSPseudoCodigo = (props: Props) => {
    const passo = props.simulacao.dfs.caminho[props.simulacao.passo];
    const algoritmo = `DFS(s) {
    s.visitado = true;
    para cada v.adj(s) em G
        se v.visitado == false
            DFS(v);
}
main (){
    para cada v em G
        v.visitado = false
    DFS(verticeInicial)
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

export default connector(DFSPseudoCodigo)