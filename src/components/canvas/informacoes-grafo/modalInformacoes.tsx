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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
                onClose={() => {props.setOpen(false)}}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Informações"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <div>
                            <h4 className={classes.subTitle}>Criação do Grafo</h4>
                            <p className={classes.content}>Para criar um vértice, clique com o botão esquerdo do mouse em algum lugar dentro do canvas.</p>
                            <p className={classes.content}>Para criar uma aresta, clique 2 vezes com o botão esquerdo do mouse no vértice de origem e em seguida 1 vez no vértice de destino.</p>
                            <p className={classes.content}>Ao clicar com o botão direito do mouse em cima de uma aresta ou vértice, um menu de opções é apresentado.</p>
                        </div>
                        {AlgoritmosInformacoes.get(props.eAlgoritmo)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {props.setOpen(false)}} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}