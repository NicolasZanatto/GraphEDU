import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FastForwardIcon from '@material-ui/icons/FastForward';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const ComponenteSimulacao = (props:any) =>{
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <FastRewindIcon fontSize="large" />
      </IconButton>
      <IconButton  aria-label="add an alarm">
        <SkipPreviousIcon fontSize="large" />
      </IconButton>
      <IconButton color="secondary"  aria-label="Iniciar">
        <PlayArrowIcon  fontSize="large"/>
      </IconButton>
      <IconButton  aria-label="Iniciar">
        <SkipNextIcon fontSize="large" />
      </IconButton>
      <IconButton  aria-label="Iniciar">
        <FastForwardIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default ComponenteSimulacao;