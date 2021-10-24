import { Grid } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../store/types";
import { CamposAdicionais } from './common/CamposAdicionais';
import { ICamposAdicionais } from './interfaces/IItemCampoAdicional';

const KRUSKALcamposAdicionais = (props: Props) => {
    const passo = props.simulacao.kruskal.caminho[props.simulacao.passo];
    const itensCamposAdicionais: ICamposAdicionais = {
        itens: [
            { id: "aresta-e", titulo: "Aresta e", valor: passo?.arestaE !== undefined ?`(${passo?.arestaE?.source.id},${passo?.arestaE?.target.id})` : "" },
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

export default connector(KRUSKALcamposAdicionais)