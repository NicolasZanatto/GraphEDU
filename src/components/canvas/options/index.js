import React from "react";

import RadioButtonDirigido from "./RadioButtonDirigido";
import RadioButtonValorado from "./RadioButtonValorado";
import { Grid } from "@material-ui/core";

export default function Options() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <RadioButtonDirigido></RadioButtonDirigido>
            </Grid>
            <Grid item xs={3}>
                <RadioButtonValorado></RadioButtonValorado>
            </Grid>
        </Grid>
    );
}