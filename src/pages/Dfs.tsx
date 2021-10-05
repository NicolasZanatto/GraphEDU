import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Canvas from "../components/canvas/Canvas";
import ComponenteSimulacao from "../components/componente-simulacao/ComponenteSimulacao";
import DFSPseudoCodigo from "../components/pseudo-codigo/DfsPseudoCodigo";
import DFSCamposAdicionais from "../components/campos-adicionais/DFSCamposAdicionais";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as SimulacaoActions from "../store/actions/simulacaoAction";
import { IState } from "../store/types";
import { EAlgoritmos } from '../Algoritmos/EAlgoritmos';
import LegendasDFS from "../components/canvas/legendas/LegendasDFS";
import { MenuLateral } from './common/MenuLateral';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
const Dfs = (props: Props) => {
    const useFirstRender = () => {
        const ref = React.useRef(true);
        const firstRender = ref.current;
        ref.current = false;
        return firstRender;
    };


    if (useFirstRender())
        props.SetAlgoritmoAction(EAlgoritmos.DFS);


    const classes = useStyles();
    return (
        <MenuLateral>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid container className={classes.canvas}>
                        <Grid item xs={12}>
                            <LegendasDFS></LegendasDFS>
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
                    <div className={classes.paper}>DFS</div>
                    <DFSCamposAdicionais></DFSCamposAdicionais>
                </Grid>
                <Grid item xs={3}>
                    <DFSPseudoCodigo></DFSPseudoCodigo>
                </Grid>

            </Grid>
        </MenuLateral>
    );
}

const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(SimulacaoActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(Dfs)