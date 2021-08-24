import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import RadioButtonDirigido from "./RadioButtonDirigido";
import RadioButtonValorado from "./RadioButtonValorado";
import { Grid } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Options({ handleStartCanvas }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        handleStartCanvas(true);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Por favor, selecione as configurações do grafo."}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <RadioButtonDirigido></RadioButtonDirigido>
                        </Grid>
                        <Grid item xs={6}>
                            <RadioButtonValorado></RadioButtonValorado>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}