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
import BFS from "../../Algoritmos/BFS";
import { EAlgoritmos } from '../../Algoritmos/EAlgoritmos';
import ContadorPassos from "./utils/ContadorPassos";
import DIJKSTRA from '../../Algoritmos/DIJKSTRA';
import BELLMANFORD from '../../Algoritmos/BELLMANFORD';
import FLOYDWARSHALL from '../../Algoritmos/FLOYDWARSHALL';
import PRIM from "../../Algoritmos/PRIM";
import KRUSKAL from '../../Algoritmos/KRUSKAL';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
      fontSize: "1.5rem"
    }
  }),
);





const ComponenteSimulacao = (props: Props) => {

  const [voltarAoInicio, setvoltarAoInicio] = useState(false);
  const [voltarPasso, setVoltarPasso] = useState(false);
  const [startSimulacao, setStartSimulacao] = useState(false);
  const [avancarPasso, setAvancarPasso] = useState(false);
  const [avancarAoFinal, setAvancarAoFinal] = useState(false);
  const [passo, setPasso] = useState(0);
  const [qntdPassos, setQntdPassos] = useState(0);

  const ExecutarAlgoritmo = (props: Props) => {
    console.log("Executar Algoritmo", props.simulacao.tipoAlgoritmo)
    switch (props.simulacao.tipoAlgoritmo) {
      case EAlgoritmos.DFS:
        const dfs = new DFS(props.canvas);
        const retornoDFS = dfs.main();
        props.updateDFSAction(retornoDFS)
        setQntdPassos(retornoDFS.caminho.length);
        props.setQntdPassosAction(retornoDFS.caminho.length);
        break;
      case EAlgoritmos.BFS:
        const bfs = new BFS(props.canvas);
        const retornoBFS = bfs.main();
        props.updateBFSAction(retornoBFS);
        setQntdPassos(retornoBFS.caminho.length);
        props.setQntdPassosAction(retornoBFS.caminho.length);
        break;
      case EAlgoritmos.DIJKSTRA:
        const dijkstra = new DIJKSTRA(props.canvas);
        const retornoDijkstra = dijkstra.main();
        props.updateDIJKSTRAAction(retornoDijkstra);
        setQntdPassos(retornoDijkstra.caminho.length);
        props.setQntdPassosAction(retornoDijkstra.caminho.length);
        break;
      case EAlgoritmos.BELLMANFORD:
        const bellman = new BELLMANFORD(props.canvas);
        const retornoBellman = bellman.main();
        props.updateBELLMANFORDAction(retornoBellman);
        setQntdPassos(retornoBellman.caminho.length);
        props.setQntdPassosAction(retornoBellman.caminho.length);
        break;
      case EAlgoritmos.FLOYDWARSHALL:
        const floydWarshall = new FLOYDWARSHALL(props.canvas);
        const retornoFloydWarshall = floydWarshall.main();
        console.log("Retorno FW:", retornoFloydWarshall);
        props.updateFLOYDWARSHALLAction(retornoFloydWarshall);
        setQntdPassos(retornoFloydWarshall.caminho.length);
        props.setQntdPassosAction(retornoFloydWarshall.caminho.length);
        break;
      case EAlgoritmos.PRIM:
        const prim = new PRIM(props.canvas);
        const retornoPRIM = prim.main();
        props.updatePRIMAction(retornoPRIM);
        setQntdPassos(retornoPRIM.caminho.length);
        props.setQntdPassosAction(retornoPRIM.caminho.length);
        break;
      case EAlgoritmos.KRUSKAL:
          const kruskal = new KRUSKAL(props.canvas);
          const retornoKruskal = kruskal.main();
          props.updateKRUSKALAction(retornoKruskal);
          setQntdPassos(retornoKruskal.caminho.length);
          props.setQntdPassosAction(retornoKruskal.caminho.length);
        break;
    }

  }

  const handleVoltarAoInicio = (props: Props) => {
    setvoltarAoInicio(true);
  }

  const handleVoltar1Passo = (props: Props) => {
    setVoltarPasso(true);
  }

  const handleStartSimulacao = (props: Props) => {
    setStartSimulacao(!startSimulacao);
    if (!startSimulacao) {
      ExecutarAlgoritmo(props);
      props.setPassoAction(0);
    }

  }

  const handleAvancar1Passo = (props: Props) => {
    setAvancarPasso(true);
  }

  const handleAvancarAoFinal = (props: Props) => {
    setAvancarAoFinal(true);
  }

  React.useEffect(() => {
    if (voltarAoInicio) {
      setStartSimulacao(false);
      setvoltarAoInicio(false)
      setPasso(0);
      props.setPassoAction(0);
    }
    if (voltarPasso) {
      setStartSimulacao(false);
      setVoltarPasso(false);
      if (passo > 0) {
        setPasso(passo - 1);
        props.setPassoAction(passo - 1);
      }
    }
    if (avancarPasso) {
      setStartSimulacao(false);
      setAvancarPasso(false);
      if (passo < qntdPassos) {
        setPasso(passo + 1);
        props.setPassoAction(passo + 1);
      }
      if (passo === qntdPassos) {
        setPasso(0);
        props.setPassoAction(0);
      }
      console.log(props.simulacao.bfs.caminho[props.simulacao.passo]);
    }
    if (avancarAoFinal) {
      setStartSimulacao(false);
      setAvancarAoFinal(false);
      setPasso(qntdPassos - 1);
      props.setPassoAction(qntdPassos - 1);
      console.log(props.simulacao.bfs.caminho)
    }

    const timeout = setTimeout(() => {
      if (startSimulacao) {
        props.setPassoAction(passo);
        setPasso(passo + 1);
        if (passo >= qntdPassos) {
          setStartSimulacao(false);
          setPasso(0);
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);


  }, [passo, qntdPassos, props, voltarAoInicio, voltarPasso, startSimulacao, avancarPasso, avancarAoFinal]);


  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ContadorPassos></ContadorPassos>
      <IconButton aria-label="Voltar ao Início" title="Voltar ao Início" onClick={() => handleVoltarAoInicio(props)}>
        <FastRewindIcon className={classes.button} />
      </IconButton>
      <IconButton aria-label="Voltar 1 Passo" title="Voltar 1 Passo" onClick={() => handleVoltar1Passo(props)}>
        <SkipPreviousIcon className={classes.button} />
      </IconButton>
      <IconButton color="secondary" aria-label="Iniciar" title="Iniciar/Pausar" onClick={() => handleStartSimulacao(props)}>
        {startSimulacao ? <PauseIcon className={classes.button}></PauseIcon> : <PlayArrowIcon className={classes.button} />}
      </IconButton>
      <IconButton aria-label="Avançar 1 Passo" title="Avançar 1 Passo" onClick={() => handleAvancar1Passo(props)}>
        <SkipNextIcon className={classes.button} />
      </IconButton>
      <IconButton aria-label="Avançar ao Final" title="Avançar ao Final" onClick={() => handleAvancarAoFinal(props)}>
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