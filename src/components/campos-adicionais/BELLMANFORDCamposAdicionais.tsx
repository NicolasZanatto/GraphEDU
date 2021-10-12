import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import { CamposAdicionais } from './common/CamposAdicionais';
import { ICamposAdicionais } from './interfaces/IItemCampoAdicional';

const BELLMANFORDCamposAdicionais = (props: Props) => {
    const passo = props.simulacao.bellmanford.caminho[props.simulacao.passo];
    const itensCamposAdicionais: ICamposAdicionais = {
        itens: [
            { id: "vertice-u", titulo: "Vértice u", valor: passo?.verticeU?.toString() },
            { id: "vertice-v", titulo: "vertice-v", valor: passo?.verticeV?.toString() },
            { id: "distancia-u", titulo: "distancia-u", valor: passo?.distanciaU?.toString() },
            { id: "distancia-v", titulo: "distancia-v", valor: passo?.distanciaV?.toString() },
            { id: "aresta-u-v", titulo: "aresta-u-v", valor: passo?.arestaE?.toString() },
            { id: "temp-distancia", titulo: "temp-distancia", valor: passo?.tempDistancia?.toString() }
        ]
    }

    return (
        <CamposAdicionais {...itensCamposAdicionais}></CamposAdicionais>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(BELLMANFORDCamposAdicionais)