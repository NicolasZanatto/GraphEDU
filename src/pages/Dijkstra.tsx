import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Canvas from "../components/canvas/Canvas";
import ComponenteSimulacao from "../components/componente-simulacao/ComponenteSimulacao";
import DijkstraPseudoCodigo from "../components/pseudo-codigo/DijkstraPseudoCodigo";
import DIJKSTRACamposAdicionais from "../components/campos-adicionais/DIJKSTRACamposAdicionais";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as SimulacaoActions from "../store/actions/simulacaoAction";
import { IState } from "../store/types";
import { EAlgoritmos } from '../Algoritmos/EAlgoritmos';
import LegendasDIJKSTRA from "../components/canvas/legendas/LegendasDIJKSTRA";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    simulacao: {
        textAlign: 'center',
    },
    canvas: {
        boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.6)"
    }
}));

const Dikstra = (props: Props) => {
    const useFirstRender = () => {
        const ref = React.useRef(true);
        const firstRender = ref.current;
        ref.current = false;
        return firstRender;
    };


    if (useFirstRender())
        props.SetAlgoritmoAction(EAlgoritmos.DIJKSTRA);

    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>DIJKSTRA</Paper>
            </Grid>
            <Grid item xs={6}>
                <Grid container className={classes.canvas}>
                    <Grid item xs={12}>
                        <LegendasDIJKSTRA></LegendasDIJKSTRA>
                    </Grid>
                    <Grid item xs={12}>
                        <Canvas></Canvas>
                    </Grid>
                </Grid>
                <Grid className={classes.simulacao} item xs={12}>
                    <ComponenteSimulacao>Componente Simulação</ComponenteSimulacao>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <DijkstraPseudoCodigo></DijkstraPseudoCodigo>
                <DIJKSTRACamposAdicionais></DIJKSTRACamposAdicionais>
            </Grid>

        </Grid>
    );
}

const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(SimulacaoActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(Dikstra)