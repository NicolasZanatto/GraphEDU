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
            fontSize: "15px",
            maxWidth: 310,
            maxHeight: 400,
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
        selected: {
            color: "red"
        },
    }),
);

const BFSPseudoCodigo = (props: Props) => {
    const classes = useStyles();
    const passo = props.simulacao.dfs.caminho[props.simulacao.passo];
    console.log("Pseudo Passo:", passo);

    const chaveEsquerda = "{";
    const chaveDireita = "}";
    return (
        <div className={classes.root}>
            <p>BFS(s){chaveEsquerda}</p>
            <p className={classes.p20}>Q = nova fila</p>
            <p className={classes.p20}>s.visitado = true</p>
            <p className={classes.p20}>Q.coloca(s)</p>
            <p className={classes.p20}>enquanto Q != vazio</p>
            <p className={classes.p40}>v = Q.retirar_primeiro_elemento()</p>
            <p className={classes.p40}>para cada e adjacente a v</p>
            <p className={classes.p60}>se e.visitado == false</p>
            <p className={classes.p80}>Q.coloca(e)</p>
            <p className={classes.p80}>e.visitado = true</p>
            <p className={classes.p60}>fimse</p>
            <p className={classes.p40}>fimpara</p>
            <p className={classes.p20}>fimenquanto</p>
            {chaveDireita}

            <p>main(){chaveEsquerda}</p>
            <p className={classes.p20}> para cada v em G</p>
            <p className={classes.p40}>v.visitado = false</p>
            <p className={classes.p20}>fimpara</p>
            <p className={classes.p20}>s = G(0)</p>
            <p className={classes.p20}>BFS(s)</p>
            <p>{chaveDireita}</p>
        </div>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

export default connector(BFSPseudoCodigo)