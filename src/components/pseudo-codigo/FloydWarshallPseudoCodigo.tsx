import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IState } from "../../store/types";
import $ from "jquery";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            fontSize: "14px",
            maxHeight: "80vh",
            overflow: "auto"

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

const FloydWarshallPseudoCodigo = (props: Props) => {
    const classes = useStyles();
    console.log("pseudo fw", props.simulacao.floydWarshall)
    const passo = props.simulacao.floydWarshall.caminho[props.simulacao.passo];
    console.log("Passo simulação", props.simulacao);
    console.log("Passo FW", props.simulacao.passo);
    if (passo !== undefined) {
        const numeroLinhas = 20;
        for (let i = 1; i <= numeroLinhas; i++) {
            $(`#code${i}`).removeClass(classes.selected);
        }
        $(`#code${passo.linha}`).addClass(classes.selected);
    }

    const chaveEsquerda = "{";
    const chaveDireita = "}";
    return (
        <div className={classes.root}>
            <div id="code1"><p>FloydWarshall(){chaveEsquerda}</p></div>
            <div id="code2"><p className={classes.p20}>para i de 1 até N</p></div>
            <div id="code3"><p className={classes.p40}>para j de 1 até N</p></div>
            <div id="code4"><p className={classes.p60}>se existe aresta(i,j)</p></div>
            <div id="code5"><p className={classes.p80}>dist(i,j) = peso_aresta(i,j); p(i,j) = i;</p></div>
            <div id="code6"><p className={classes.p60}>senao</p></div>
            <div id="code7"><p className={classes.p80}>dist(i,j) = infinito</p></div>
            <div id="code8"><p className={classes.p60}>fimse</p></div>
            <div id="code9"><p className={classes.p40}>fimpara</p></div>
            <div id="code10"><p className={classes.p20}>fimpara</p></div>
            <div id="code11"><p className={classes.p20}>para k de 1 ate N</p></div>
            <div id="code12"><p className={classes.p40}>para i de 1 ate N</p></div>
            <div id="code13"><p className={classes.p60}>para j de 1 ate N</p></div>
            <div id="code14"><p className={classes.p80}>se dist(i,j) &gt; dist(i,k) + dist(k,j)</p></div>
            <div id="code15"><p className={classes.p100}>dist(i,j) = dist(i,k) + dist(k,j); p(i,j) = p(k,j);</p></div>
            <div id="code16"><p className={classes.p80}>fimse</p></div>
            <div id="code17"><p className={classes.p60}>fimpara</p></div>
            <div id="code18"><p className={classes.p40}>fimpara</p></div>
            <div id="code19"><p className={classes.p20}>fimpara</p></div>
            <div id="code20"><p>{chaveDireita}</p></div>
        </div>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(FloydWarshallPseudoCodigo)