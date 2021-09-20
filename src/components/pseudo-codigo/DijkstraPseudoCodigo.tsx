import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IState } from "../../store/types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            fontSize: "14px",
            maxWidth: "100%",
            maxHeight: "40%",
            overflowY: "scroll"

        },
        p20: {
            paddingLeft: "20px",
        },
        p40: {
            paddingLeft: "40px"
        },
        p60: {
            paddingLeft: "60px"
        },
        p80: {
            paddingLeft: "80px"
        },
        p100: {
            paddingLeft: "100px"
        },
        selected: {
            color: "red"
        },
    }),
);

const DijkstraPseudoCodigo = (props: Props) => {
    const classes = useStyles();
    const passo = props.simulacao.dfs.caminho[props.simulacao.passo];
    if (passo !== undefined) {
        const numeroLinhas = 22;
        for (let i = 1; i <= numeroLinhas; i++) {
            $(`#code${i}`).removeClass(classes.selected);
        }
        $(`#code${passo.linha}`).addClass(classes.selected);
    }
    
    const chaveEsquerda = "{";
    const chaveDireita = "}";
    return (
        <div className={classes.root}>
            <div id="code1"><p>Dijkstra(s){chaveEsquerda}</p></div>
            <div id="code2"><p className={classes.p20}>para cada v em G</p></div>
            <div id="code3"><p className={classes.p20}>d[v] = infinito</p></div>
            <div id="code4"><p className={classes.p20}>fimpara</p></div>
            <div id="code5"><p className={classes.p20}>d[s] = 0</p></div>
            <div id="code6"><p className={classes.p20}>Q = Vertices que a distância ainda não foi calculada</p></div>
            <div id="code7"><p className={classes.p20}>enquanto Q != vazio</p></div>
            <div id="code8"><p className={classes.p40}>u = um vértice em Q, no qual d[u] é a distância mínima</p></div>
            <div id="code9"><p className={classes.p40}>se u == t</p></div>
            <div id="code10"><p className={classes.p60}>return;</p></div>
            <div id="code11"><p className={classes.p40}>para cada v adjacente a u</p></div>
            <div id="code12"><p className={classes.p60}>se v está em Q</p></div>
            <div id="code13"><p className={classes.p80}>e = aresta(u,v)</p></div>
            <div id="code14"><p className={classes.p80}>se d[v] &gt; d[u] + l[e] </p></div>
            <div id="code15"><p className={classes.p100}>d[v] = d[u] + l[e]</p></div>
            <div id="code16"><p className={classes.p80}>fimse</p></div>
            <div id="code18"><p className={classes.p60}>fimse</p></div>
            <div id="code19"><p className={classes.p40}>fimpara</p></div>
            <div id="code20"><p className={classes.p40}>Q.remove(u)</p></div>
            <div id="code21"><p className={classes.p20}>fimenquanto</p></div>
            <div id="code22"><p>{chaveDireita}</p></div>
        </div>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(DijkstraPseudoCodigo)