import { Grid } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import { CamposAdicionais } from './common/CamposAdicionais';
import { MatrizDistancia } from './FLOYDWARSHALLCamposAdicionaisMatrizDist';
import { ICamposAdicionais } from './interfaces/IItemCampoAdicional';

const FLOYDWARSHALLCamposAdicionais = (props: Props) => {
    const passo = props.simulacao.floydWarshall.caminho[props.simulacao.passo];
    const itensCamposAdicionais: ICamposAdicionais = {
        itens: [
            { id: "vertice-k", titulo: "vertice k", valor: passo?.verticeK?.toString() },
            { id: "vertice-i", titulo: "Vértice i", valor: passo?.verticeI?.toString() },
            { id: "vertice-j", titulo: "vertice j", valor: passo?.verticeJ?.toString() },
            { id: "distancia-i-j", titulo: "distância (i,j)", valor: passo?.distanciaIJ?.toString() },
            { id: "distancia-i-k", titulo: "distância (i,k)", valor: passo?.distanciaIK?.toString() },
            { id: "distancia-k-j", titulo: "distância (k,j)", valor: passo?.distanciaKJ?.toString() },
        ]
    }

    return (
        <Grid>
            <CamposAdicionais {...itensCamposAdicionais}></CamposAdicionais>
            <MatrizDistancia {...passo}></MatrizDistancia>
        </Grid>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(FLOYDWARSHALLCamposAdicionais)