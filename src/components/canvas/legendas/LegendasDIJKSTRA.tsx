import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
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

export default function Legendas() {
    const classes = useStyles();

    return (
        <Grid item xs className={classes.root}>
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
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#F8D525" />
                    </svg>
                    Conjunto Q
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#07A0C3" />
                    </svg>
                    Vértice u
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#DD1C1A" />
                    </svg>
                    Vértice v
                </span>
                <span>
                    <svg width="5%" height="30">
                        <circle cx="15" cy="20" r="8" stroke="black" strokeWidth="2" fill="#558B6E" />
                    </svg>
                    Vértice e
                </span>
        </Grid> 
    );
}