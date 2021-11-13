import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as SimulacaoActions from "../../../store/actions/simulacaoAction";
import { IState } from "../../../store/types";

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import Info from '@mui/icons-material/Info';
import ModalInformacoes from "./modalInformacoes";
import { EAlgoritmosDescription } from "../../../Algoritmos/EAlgoritmos";
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


const InformacoesGrafoButtons = (props : Props) =>{
    const [open, setOpen] = React.useState(props.simulacao.modalInfoOpen);
    const handleClick =(value : boolean) => {
        setOpen(value);
        props.SetModalInfoAction(value);
    }

    const handleClickOpenInfo = () => {
        setOpen(true);

    }

    const classes = useStyles();


    return (
            <div className={classes.root}>
                {EAlgoritmosDescription.get(props.simulacao.tipoAlgoritmo!)}                                
                <IconButton onClick={handleClickOpenInfo} className={classes.button} title="Informações" aria-label="upload picture" component="span">
                    <Info className={classes.button} color="warning" />
                </IconButton>
                <ModalInformacoes open={open} handleClick={handleClick} eAlgoritmo={props.simulacao.tipoAlgoritmo!}></ModalInformacoes>               
            </div>
    );
}


const mapStateToProps = (state: IState) => ({
    simulacao: state.simulacao
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(SimulacaoActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(InformacoesGrafoButtons)