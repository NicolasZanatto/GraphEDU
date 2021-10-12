import { ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import TimelineIcon from '@mui/icons-material/Timeline';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import HomeIcon from '@mui/icons-material/Home';
import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    text: {
        color: "black",
        textDecoration: 'none'
    }
}));

interface IProps {
    home: boolean,
    text: string,
    caminho: string,
    algoritmo: EAlgoritmos
}

const ItemIcon = (algoritmo: any) => {
    switch (algoritmo.tipoAlgoritmo) {
        case EAlgoritmos.DFS:
        case EAlgoritmos.BFS:
            return <BubbleChartIcon></BubbleChartIcon>
        case EAlgoritmos.DIJKSTRA:
        case EAlgoritmos.BELLMANFORD:
        case EAlgoritmos.FLOYDWARSHALL:
            return <TimelineIcon></TimelineIcon>
        case EAlgoritmos.PRIM:
        case EAlgoritmos.KRUSKAL:
            return <DeviceHubIcon></DeviceHubIcon>

        default:
            return <HomeIcon></HomeIcon>
    }
}

export default function ItemLink(props: IProps) {
    const classes = useStyles();

    return (
        <Link className={classes.text} to={props.home ? props.caminho : `/Algoritmos/${props.caminho}`}>
            <ListItem button key={props.text}>
                <ListItemIcon>
                    <ItemIcon tipoAlgoritmo={props.algoritmo}></ItemIcon>
                </ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItem>
        </Link>
    );
}