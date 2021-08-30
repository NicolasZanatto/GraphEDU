import React, { useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FastForwardIcon from '@material-ui/icons/FastForward';
import { IState } from "../../store/types";
import * as SimulacaoActions from "../../store/actions/simulacaoAction";
import DFS from "../../Algoritmos/DFS";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
      fontSize: "2.0rem"
    }
  }),
);





const ComponenteSimulacao = (props: Props) => {

  const [simulacaoIniciada, setSimulacaoIniciada] = useState(false);

  const handleSimulacaoIniciada = (props: Props) => {
    setSimulacaoIniciada(!simulacaoIniciada);
    if (!simulacaoIniciada) {
      const dfs = new DFS(props.canvas);
      const retorno = dfs.main();
      props.updateDFSAction(retorno)
    }

  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <FastRewindIcon className={classes.button} />
      </IconButton>
      <IconButton aria-label="add an alarm">
        <SkipPreviousIcon className={classes.button} />
      </IconButton>
      <IconButton color="secondary" aria-label="Iniciar" onClick={() => handleSimulacaoIniciada(props)}>
        {simulacaoIniciada ? <PauseIcon className={classes.button}></PauseIcon> : <PlayArrowIcon className={classes.button} />}
      </IconButton>
      <IconButton aria-label="Iniciar">
        <SkipNextIcon className={classes.button} />
      </IconButton>
      <IconButton aria-label="Iniciar">
        <FastForwardIcon className={classes.button} />
      </IconButton>
    </div>
  );
}


const mapStateToProps = (state: IState) => ({
  canvas: state.canvas,
  simulacao: state.simulacao
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SimulacaoActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(ComponenteSimulacao)