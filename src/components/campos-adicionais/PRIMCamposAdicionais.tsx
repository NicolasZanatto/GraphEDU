import { Grid } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import { CamposAdicionais } from './common/CamposAdicionais';
import { ICamposAdicionais } from './interfaces/IItemCampoAdicional';

const PRIMCamposAdicionais = (props: Props) => {
    const passo = props.simulacao.prim.caminho[props.simulacao.passo];
    const itensCamposAdicionais: ICamposAdicionais = {
        itens: [
            { id: "vertice-u", titulo: "Vertice u", valor: passo?.verticeU?.toString() },
            { id: "vertice-v", titulo: "Vértice v", valor: passo?.verticeV?.toString() },
            { id: "distancia-u", titulo: "Distância u", valor: passo?.distanciaU?.toString() },
            { id: "distancia-v", titulo: "Distância v", valor: passo?.distanciaV?.toString() },
            { id: "peso-aresta-u-v", titulo: "Peso Aresta (u,v)", valor: passo?.arestaE?.toString() },
            { id: "conjunto-u", titulo: "Conjunto U", valor: passo?.conjuntoU?.toString() },
            { id: "vertices-adjacentes-a-u", titulo: "Vertices Adjacentes a u", valor: passo?.listaAdj?.toString() },
        ]
    }

    return (
        <Grid>
            <CamposAdicionais {...itensCamposAdicionais}></CamposAdicionais>
        </Grid>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(PRIMCamposAdicionais)