import React from "react";
import { Grid } from "@material-ui/core";
import { Dispatch, bindActionCreators } from "redux";
import { makeStyles, styled } from '@material-ui/core/styles';
import * as CanvasActions from "../../../store/actions/canvasAction";
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../../store/types";
import { IGrafo } from "../../../store/types/canvasTypes";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "right"
    },
    button: {
        color: "black",
    },
    svg: {
        position: "relative",
    }
}));

const handleDownloadClick = (props: Props) => {
    var json = JSON.stringify(props.canvas);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download = "grafo.json";
    a.href = url;
    a.textContent = "Download grafo.json";
    a.click();
}

const handleUploadButton = (event: React.ChangeEvent<HTMLInputElement>, props: Props) => {
    const content = event.target.files?.item(0)!;

    if (content === undefined || content === null) return;

    let retorno: string | ArrayBuffer;
    let grafo: IGrafo;
    const reader = new FileReader();
    reader.readAsText(content);
    reader.onload = () => {
        retorno = reader.result!
        grafo = JSON.parse(retorno.toString());
        console.log("grafo", grafo);
        props.setarGrafoAction(grafo);
        props.restartGrafoAction(true);
    }
}

const Input = styled('input')({
    display: 'none',
});

const ImportacaoExportacaoButtons = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid item xs className={classes.root}>
            <IconButton className={classes.button} onClick={() => handleDownloadClick(props)} title="Exportar Grafo" component="span">
                <FileDownloadIcon />
            </IconButton>
            <label htmlFor="icon-button-file">
                <Input id="icon-button-file" type="file" onChange={(event) => handleUploadButton(event, props)} />
                <IconButton className={classes.button} title="Importar Grafo" aria-label="upload picture" component="span">
                    <FileUploadIcon />
                </IconButton>
            </label>
        </Grid>
    );
}


const mapStateToProps = (state: IState) => ({
    canvas: state.canvas
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(CanvasActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(ImportacaoExportacaoButtons)