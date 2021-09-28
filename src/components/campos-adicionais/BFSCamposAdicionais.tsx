import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IState } from "../../store/types";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontSize: "14px",
            backgroundColor: theme.palette.background.paper,
        },
        item: {
            fontSize: "14px",
            paddingBottom: 0,
            paddingTop: 0
        }
    })
);

const BFSCamposAdicionais = (props: Props) => {
    const classes = useStyles();
    const passo = props.simulacao.bfs.caminho[props.simulacao.passo];
    const verticeE = passo !== undefined ? passo.verticeE : 0;
    const verticeV = passo !== undefined ? passo.verticeV : 0;
    const filaQ = passo !== undefined ? passo.filaQ.toString() : "";
    const verticesAdj = passo !== undefined ? passo.listaAdj.toString() : "";

    return (
        <List subheader={<ListSubheader>Informações Adicionais</ListSubheader>} className={classes.root}>
            <ListItem>
                <ListItemText id="switch-list-label-wifi" classes={{ primary: classes.item }} primary="Fila Q:" />
                <ListItemSecondaryAction>
                    <ListItemText id="switch-list-label-wifi" classes={{ primary: classes.item }} primary={filaQ || ""} />
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText id="switch-list-label-bluetooth" classes={{ primary: classes.item }} primary="Vértice v:" />
                <ListItemSecondaryAction>
                    <ListItemText id="switch-list-label-bluetooth" classes={{ primary: classes.item }} primary={verticeV || ""} />
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText id="switch-list-label-bluetooth" classes={{ primary: classes.item }} primary="Vértice e:" />
                <ListItemSecondaryAction>
                    <ListItemText id="switch-list-label-bluetooth" classes={{ primary: classes.item }} primary={verticeE || ""} />
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText id="switch-list-label-bluetooth" classes={{ primary: classes.item }} primary="Vértices Adjacentes:" />
                <ListItemSecondaryAction>
                    <ListItemText id="switch-list-label-bluetooth" classes={{ primary: classes.item }} primary={verticesAdj || ""} />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(BFSCamposAdicionais)