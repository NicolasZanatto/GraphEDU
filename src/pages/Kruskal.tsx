import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Canvas from "../components/canvas/Canvas";
import ComponenteSimulacao from "../components/componente-simulacao/ComponenteSimulacao";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as SimulacaoActions from "../store/actions/simulacaoAction";
import { IState } from "../store/types";
import { EAlgoritmos } from '../Algoritmos/EAlgoritmos';
import LegendasKruskal from "../components/canvas/legendas/LegendasKRUSKAL";
import { MenuLateral } from './common/MenuLateral';
import KruskalPseudoCodigo from '../components/pseudo-codigo/KruskalPseudoCodigo';
import KRUSKALCamposAdicionais from '../components/campos-adicionais/KRUSKALCamposAdicionais';
import InformacoesGrafo from "../components/canvas/informacoes-grafo/"

const useStyles = makeStyles((theme) => ({
    root: {
    },
    title: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontSize: "17px"
    },
    simulacao: {
        textAlign: 'center',
    },
    canvas: {
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.6)"
    }
}));

const Kruskal = (props: Props) => {
    const useFirstRender = () => {
        const ref = React.useRef(true);
        const firstRender = ref.current;
        ref.current = false;
        return firstRender;
    };


    if (useFirstRender())
        props.SetAlgoritmoAction(EAlgoritmos.KRUSKAL);

    const classes = useStyles();

    return (
        <MenuLateral>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid container className={classes.canvas}>
                        <Grid item xs={12}>
                        <InformacoesGrafo ></InformacoesGrafo>
                        </Grid>
                        <Grid item xs={12}>
                            <LegendasKruskal></LegendasKruskal>
                        </Grid>
                        <Grid item xs={12}>
                            <Canvas></Canvas>
                        </Grid>
                    </Grid>
                    <Grid className={classes.simulacao} item xs={12}>
                        <ComponenteSimulacao>Componente Simulação</ComponenteSimulacao>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <KruskalPseudoCodigo></KruskalPseudoCodigo>
                </Grid>
                <Grid item xs={2}>
                    <KRUSKALCamposAdicionais></KRUSKALCamposAdicionais>
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

export default connector(Kruskal)