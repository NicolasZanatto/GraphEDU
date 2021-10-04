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
        selected: {
            color: "red"
        },
    }),
);

const DFSPseudoCodigo = (props: Props) => {
    const classes = useStyles();
    const passo = props.simulacao.dfs.caminho[props.simulacao.passo];
    const classNameC1 = passo?.linha === 1 ? classes.selected : "";
    const classNameC2 = passo?.linha === 2 ? classes.selected : "";
    const classNameC3 = passo?.linha === 3 ? classes.selected : "";
    const classNameC4 = passo?.linha === 4 ? classes.selected : "";
    const classNameC5 = passo?.linha === 5 ? classes.selected : "";
    const classNameC6 = passo?.linha === 6 ? classes.selected : "";
    const classNameC7 = passo?.linha === 7 ? classes.selected : "";
    const classNameC8 = passo?.linha === 8 ? classes.selected : "";
    const classNameC9 = passo?.linha === 9 ? classes.selected : "";
    const classNameC10 = passo?.linha === 10 ? classes.selected : "";

    const chaveEsquerda = "{";
    const chaveDireita = "}";
    return (
        <div className={classes.root}>
            <div className={classNameC1}><p id="code1">DFS(s) {chaveEsquerda}</p></div>
            <div className={classNameC2}><p id="code2" className={classes.p20}>s.visitado = true</p></div>
            <div className={classNameC3}><p id="code3" className={classes.p20}>para cada v.adj(s) em G</p></div >
            <div className={classNameC4}><p id="code4" className={classes.p40}>se v.visitado == false</p></div >
            <div className={classNameC5}><p id="code5" className={classes.p60}>DFS(v)</p></div >
            <div className={classNameC6}><p id="code6" >{chaveDireita}</p></div >


            <div className={classNameC7}><p id="code7" >main ( ){chaveEsquerda}</p></div>
            <div className={classNameC8}><p id="code8" className={classes.p20}>para cada v em G</p></div >
            <div className={classNameC9}><p id="code9" className={classes.p40}>v.visitado = false</p></div >
            <div className={classNameC10}><p id="code10" className={classes.p20}>DFS(verticeInicial)</p></div >
            <div><p id="code11">{chaveDireita}</p></div >
        </div>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(DFSPseudoCodigo)