import React, {useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch,bindActionCreators } from "redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FastForwardIcon from '@material-ui/icons/FastForward';
import { ICanvas } from "../../store/types/canvasTypes";
import * as CanvasActions from "../../store/actions/canvasAction";
import DFS from "../../Algoritmos/DFS";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button:{
        fontSize:"2.5rem"
    }
  }),
);





const ComponenteSimulacao = (props : Props) =>{
  
    const [simulacaoIniciada,setSimulacaoIniciada] = useState(false);
    
    const handleSimulacaoIniciada = (props : Props) => {
        setSimulacaoIniciada(!simulacaoIniciada);
        if(simulacaoIniciada){
            const dfs = new DFS(props.canvas);
            dfs.executar();
        }
    }
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <FastRewindIcon className={classes.button} />
      </IconButton>
      <IconButton aria-label="add an alarm">
        <SkipPreviousIcon  className={classes.button} />
      </IconButton>
      <IconButton color="secondary"  aria-label="Iniciar" onClick={() => handleSimulacaoIniciada(props)}>
        <PlayArrowIcon  className={classes.button} />
      </IconButton>
      <IconButton  aria-label="Iniciar">
        <SkipNextIcon className={classes.button} />
      </IconButton>
      <IconButton  aria-label="Iniciar">
        <FastForwardIcon className={classes.button} />
      </IconButton>
    </div>
  );
}


const mapStateToProps = (state : ICanvas) => ({
    canvas: state.canvas
});

const mapDispatchToProps = (dispatch : Dispatch) =>
    bindActionCreators(CanvasActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>
    
export default connector(ComponenteSimulacao)