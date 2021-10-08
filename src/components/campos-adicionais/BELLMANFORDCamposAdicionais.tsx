import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IState } from "../../store/types";
import ItemCampoAdicional from "./common/ItemCampo";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontSize: "14px",
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            textAlign:"center"
        },
        item: {
            fontSize: "14px",
            paddingBottom: 0,
            paddingTop: 0
        }
    })
);

const BELLMANFORDCamposAdicionais = (props: Props) => {
    const classes = useStyles();
    const passo = props.simulacao.bellmanford.caminho[props.simulacao.passo];

    return (
        <List subheader={<ListSubheader>Informações Adicionais</ListSubheader>} className={classes.root}>
            <ItemCampoAdicional id={"vertice-u"} titulo={'Vértice u'} valor={passo?.verticeU?.toString()}></ItemCampoAdicional>
            <ItemCampoAdicional id={"vertice-v"} titulo={'Vértice v'} valor={passo?.verticeV?.toString()}></ItemCampoAdicional>
            <ItemCampoAdicional id={"distancia-u"} titulo={'Distância u'} valor={passo?.distanciaU?.toString()}></ItemCampoAdicional>
            <ItemCampoAdicional id={"distancia-v"} titulo={'Distância v'} valor={passo?.distanciaV?.toString()}></ItemCampoAdicional>
            <ItemCampoAdicional id={"aresta-u-v"} titulo={'Peso Aresta (u-v)'} valor={passo?.arestaE?.toString()}></ItemCampoAdicional>
            <ItemCampoAdicional id={"temp-distancia"} titulo={'Temp Distância'} valor={passo?.tempDistancia?.toString()}></ItemCampoAdicional>
        </List>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(BELLMANFORDCamposAdicionais)