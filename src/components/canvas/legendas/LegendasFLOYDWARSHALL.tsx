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
    {nome: "Variável i", stroke: "black", fill: "#FFF1D0"},
    {nome: "Variável j", stroke: "black", fill: "#32b31b"},
    {nome: "Variável k", stroke: "black", fill: "#07A0C3"},
    {nome: "Distância (i,j)", stroke: "black", fill: "#DD1C1A"},
    {nome: "Distância (i,k)", stroke: "black", fill: "#DD1C1A"},
    {nome: "Distância (k,j)", stroke: "black", fill: "#DD1C1A"}
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