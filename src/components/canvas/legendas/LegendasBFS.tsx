import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: "10px",
        marginTop: 0
    },
    legenda: {
        textAlign: "center",
    },
    svg: {
        position: "relative",
    }
}));

export default function Legendas() {
    const classes = useStyles();

    return (
        <Grid item xs className={classes.root}>
            <p className={classes.legenda}>Legendas</p>
            <Grid item xs className={classes.svg}>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#FFF1D0" />
                    </svg>
                    Vértice
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#32b31b" />
                    </svg>
                    Vértice inicial
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#f04d4d" />
                    </svg>
                    Vértice final
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="#07A0C3" strokeWidth="2" fill="#07A0C3" />
                    </svg>
                    Vértice não visitado
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="#DD1C1A" strokeWidth="2" fill="#DD1C1A" />
                    </svg>
                    Vértice visitado
                </span>
            </Grid>
            <Grid item xs className={classes.svg}>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#F8D525" />
                    </svg>
                    Fila Q
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="#07A0C3" strokeWidth="2" fill="#F8D525" />
                    </svg>
                    Fila Q e Vértice não visitado
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="#DD1C1A" strokeWidth="2" fill="#F8D525" />
                    </svg>
                    Fila Q e Vértice visitado
                </span>               
            </Grid>
        </Grid> 
    );
}