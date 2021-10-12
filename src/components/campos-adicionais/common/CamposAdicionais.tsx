import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ItemCampoAdicional from "./ItemCampo";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { ICamposAdicionais } from '../interfaces/IItemCampoAdicional';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontSize: "14px",
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            textAlign: "center"
        },
        item: {
            fontSize: "14px",
            paddingBottom: 0,
            paddingTop: 0
        }
    })
);




export const CamposAdicionais = (campos: ICamposAdicionais) => {
    const classes = useStyles();
    console.log("Itens", campos)
    return (
        <List subheader={<ListSubheader>Informações Adicionais</ListSubheader>} className={classes.root}>
            {campos.itens.map((item, index) => {
                return <ItemCampoAdicional key={index} id={item.id} titulo={item.titulo} valor={item.valor}></ItemCampoAdicional>
            })}
        </List>
    );
}