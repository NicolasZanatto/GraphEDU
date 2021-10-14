import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import PseudoCodigoEditor from './common/PseudoCodigoEditor';

const BFSPseudoCodigo = (props: Props) => {
    const passo = props.simulacao.bfs.caminho[props.simulacao.passo];

    const algoritmo = `BFS(s){
    Q = nova fila
    s.visitado = true
    Q.coloca(s)
    enquanto Q != vazio
        v = Q.retirar_primeiro_elemento()
        para cada e adjacente a v
            se e.visitado == false
                Q.coloca(e)
                e.visitado = true
            fimse
        fimpara
    fimenquanto
}
main(){
    para cada v em G
        v.visitado = false
    fimpara
    s = G(verticeInicial)
    BFS(s)
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

export default connector(BFSPseudoCodigo)