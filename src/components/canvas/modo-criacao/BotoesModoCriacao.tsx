import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../../store/actions/canvasAction";
import { IState } from "../../../store/types/"
import { Dispatch } from 'redux';
import { Grid } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { eModoCriacao } from "./eModoCriacao";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';
const useStyles = makeStyles((theme) => ({
  canvasModes:{
    borderTop: "1px solid rgb(205 205 205 / 60%)",
    borderRadius: "2px",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.0)",
    marginTop: "10px",
    paddingTop: "10px",
    backgroundColor: "#f1f1f1",
    paddingLeft: "20px",
    textAlign: "center"
  },
  button: {
    '&:hover': {
        color: "#0696d7",
    },
  },
  buttonSelected: {
    color: "#0696d7",
  },
  svg: {
      position: "relative",
  }
}));

const BotoesModoCriacao = (props: Props) => {
    const classes = useStyles();

    const setModoCriacao = (modo: eModoCriacao) => {
        props.SetModoCriacaoGrafoAction(modo);

    }

    const handleModoCriacaoEscolhido = (modo: eModoCriacao) => {
        if(props.data.modoCriacao === modo)
            return classes.buttonSelected;
        
        return "";
    }

  return (
      <Grid className={classes.canvasModes} item xs={12}>
        <IconButton className={`${classes.button} ${classes.buttonSelected}`} onClick={() => setModoCriacao(eModoCriacao.CriacaoVertice)} title="Criar Vértice" component="span">
            <AddCircleOutlineIcon className={handleModoCriacaoEscolhido(eModoCriacao.CriacaoVertice)} sx={{ fontSize: 25 }}  />
        </IconButton>
        <IconButton className={`${classes.button} ${classes.buttonSelected}`} onClick={() => setModoCriacao(eModoCriacao.CriacaoAresta)} title="Criar Aresta" component="span">
            <AutoGraphIcon className={handleModoCriacaoEscolhido(eModoCriacao.CriacaoAresta)} sx={{ fontSize: 25 }}  />
        </IconButton>
        <IconButton className={`${classes.button} ${classes.buttonSelected}`} onClick={() => setModoCriacao(eModoCriacao.MoverVertice)} title="Mover Vértice" component="span">
            <TouchAppIcon className={handleModoCriacaoEscolhido(eModoCriacao.MoverVertice)} sx={{ fontSize: 25 }}  />
        </IconButton>
      </Grid>
  );
}

const mapStateToProps = (state: IState) => ({
  data: state.canvas,
  simulacao: state.simulacao
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(CanvasActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(BotoesModoCriacao)
