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

const DIJKSTRACamposAdicionais = (props: Props) => {
    const classes = useStyles();
    const passo = props.simulacao.dijkstra.caminho[props.simulacao.passo];
    const conjuntoQ = passo !== undefined ? passo.conjuntoQ.toString() : "";
    const verticeV = passo !== undefined ? passo.verticeV?.toString() : "";
    const distanciaV = passo !== undefined ? passo.distanciaV?.toString() : "";
    const verticeU = passo !== undefined ? passo.verticeU?.toString() : "";
    const distanciaU = passo !== undefined ? passo.distanciaU?.toString() : "";
    const arestaE = passo !== undefined ? passo.arestaE?.toString() : "";

    const verticesAdj = passo !== undefined ? passo.listaAdj.toString() : "";

    return (
        <List subheader={<ListSubheader>Informações Adicionais</ListSubheader>} className={classes.root}>
            <ItemCampoAdicional id={"conjunto-q"} titulo={'Conjunto Q'} valor={conjuntoQ}></ItemCampoAdicional>
            <ItemCampoAdicional id={"vertices-adjacentes"} titulo={'Vértices Adjacentes'} valor={verticesAdj}></ItemCampoAdicional>
            <ItemCampoAdicional id={"vertice-u"} titulo={'Vértice u'} valor={verticeU}></ItemCampoAdicional>
            <ItemCampoAdicional id={"vertice-v"} titulo={'Vértice v'} valor={verticeV}></ItemCampoAdicional>
            <ItemCampoAdicional id={"distancia-v"} titulo={'Distância v'} valor={distanciaV}></ItemCampoAdicional>
            <ItemCampoAdicional id={"distancia-u"} titulo={'Distância u'} valor={distanciaU}></ItemCampoAdicional>
            <ItemCampoAdicional id={"aresta-e"} titulo={'Peso Aresta e'} valor={arestaE}></ItemCampoAdicional>
        </List>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(DIJKSTRACamposAdicionais)