import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: "10px",
        marginTop: 0
    },
    item: {
        fontSize: "14px",
        paddingBottom: 0,
        paddingTop: 0
    }
}));

interface IProps{
    id : string,
    titulo: string, 
    valor?: string
}

export default function ItemCampoAdicional(props :IProps) {
    const classes = useStyles();

    return (
        <ListItem tabIndex={0}>
            <ListItemText id={props.id} classes={{ primary: classes.item }} primary={props.titulo} />
            <ListItemSecondaryAction>
                <ListItemText id={props.id} classes={{ primary: classes.item }} primary={props.valor || ""} />
            </ListItemSecondaryAction>
        </ListItem>
    );
}