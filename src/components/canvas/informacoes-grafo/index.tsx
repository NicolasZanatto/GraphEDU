import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import Info from '@mui/icons-material/Info';
import ModalInformacoes from "./modalInformacoes";
import { EAlgoritmos,EAlgoritmosDescription } from "../../../Algoritmos/EAlgoritmos";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontSize: "17px"
    },
    button: {
        fontSize: "35px"
    },
    svg: {
        position: "relative",
    }
}));

type IProps = {
    eAlgoritmo : EAlgoritmos
}



export default function InformacoesGrafoButtons(props : IProps){
    const [open, setOpen] = React.useState(false);
    const handleClick =() => {
        setOpen(true);
    }

    const classes = useStyles();


    return (
            <div className={classes.root}>
                {EAlgoritmosDescription.get(props.eAlgoritmo)}                                
                <IconButton onClick={() => handleClick()} className={classes.button} title="Informações" aria-label="upload picture" component="span">
                    <Info className={classes.button} color="warning" />
                </IconButton>
                <ModalInformacoes open={open} setOpen={setOpen} eAlgoritmo={props.eAlgoritmo}></ModalInformacoes>               
            </div>
    );
}