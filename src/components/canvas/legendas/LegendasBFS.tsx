import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: "10px",
        margin: 0,
        wordWrap: "break-word",
        fontSize: "14px" 
    },
    legenda: {
        textAlign: "center",
    },
    svg: {
        position: "relative",
    }
}));

const itens = [
    {nome: "Vértice", stroke: "black", fill: "#FFF1D0"},
    {nome: "Vértice inicial", stroke: "black", fill: "#32b31b"},
    {nome: "Vértice final", stroke: "black", fill: "#f04d4d"},
    {nome: "Vértice não visitado", stroke: "#07A0C3", fill: "#07A0C3"},
    {nome: "Vértice visitado", stroke: "#DD1C1A", fill: "#DD1C1A"},
    {nome: "Fila Q e Vértice não visitado", stroke: "#07A0C3", fill: "#F8D525"},
    {nome: "Fila Q e Vértice visitado", stroke: "#DD1C1A", fill: "#F8D525"},
]

export default function Legendas() {
    const classes = useStyles();

    return (
        <Grid item xs className={classes.root}>
            {itens.map((legenda, index) => {
                return <span key={index}>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke={legenda.stroke} strokeWidth="2" fill={legenda.fill} />
                    </svg>
                    {legenda.nome}
                </span>
            })}
       </Grid> 
    );
}