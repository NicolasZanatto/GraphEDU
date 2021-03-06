import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from "@material-ui/core";
import { EAlgoritmos } from "../../../Algoritmos/EAlgoritmos";
import InformacoesDFS from "./informacoes-algoritmos/informacoesDFS";
import { makeStyles } from '@material-ui/core/styles';
import InformacoesBELLMANFORD from "./informacoes-algoritmos/informacoesBELLMANFORD";
import InformacoesDIJKSTRA from "./informacoes-algoritmos/informacoesDIJKSTRA";
import InformacoesPRIM from "./informacoes-algoritmos/informacoesPRIM";
import InformacoesKRUSKAL from "./informacoes-algoritmos/informacoesKRUSKAL";
import InformacoesBFS from "./informacoes-algoritmos/informacoesBFS";
import InformacoesFLOYDWARSHALL from "./informacoes-algoritmos/informacoesFLOYDWARSHALL";


const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(1),
    },
    subTitle: {
        fontWeight: 700,
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)"
    },
    content: {
        color: "rgba(0, 0, 0, 0.54)"
    }
}));

type IProps ={
    open: boolean;
    handleClick: (value: boolean) => void;
    eAlgoritmo: EAlgoritmos;
}

export const AlgoritmosInformacoes = new Map<number, JSX.Element>([
    [EAlgoritmos.DFS, <InformacoesDFS/>],
    [EAlgoritmos.BFS, <InformacoesBFS/>],
    [EAlgoritmos.DIJKSTRA, <InformacoesDIJKSTRA/>],
    [EAlgoritmos.FLOYDWARSHALL, <InformacoesFLOYDWARSHALL/>],
    [EAlgoritmos.BELLMANFORD, <InformacoesBELLMANFORD/>],
    [EAlgoritmos.PRIM, <InformacoesPRIM/>],
    [EAlgoritmos.KRUSKAL, <InformacoesKRUSKAL/>]
  ]);


export default function ModalInformacoes(props : IProps) {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={props.open}
                keepMounted
                onClose={() => {props.handleClick(false)}}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Informa????es"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <div>
                            <h4 className={classes.subTitle}>Cria????o do Grafo</h4>
                            <p className={classes.content}>Para criar um v??rtice, clique no bot??o Criar V??rtice e em seguida em algum lugar dentro do canvas</p>
                            <p className={classes.content}>Para criar uma aresta, clique no bot??o Criar Aresta e em seguida clique no v??rtice inicial e ap??s no v??rtice final</p>
                            <p className={classes.content}>Ao clicar com o bot??o direito do mouse em cima de uma aresta ou v??rtice, um menu de op????es ?? apresentado.</p>
                            <h4 className={classes.subTitle}>Simula????o</h4>
                            <p className={classes.content}>Para iniciar a simula????o do algoritmo clique no ??cone iniciar (em vermelho) localizado abaixo do canvas.</p>

                        </div>
                        {AlgoritmosInformacoes.get(props.eAlgoritmo)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {props.handleClick(false)}} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}