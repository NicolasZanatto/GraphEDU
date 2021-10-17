import React from "react";
import { runGraph } from "./grafo";
import styles from "./canvas.module.css";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../store/actions/canvasAction";
import Options from "./opcoes";
import { IGrafo } from "../../store/types/canvasTypes";
import { IState } from "../../store/types/"
import { Dispatch } from 'redux';
import { ISimulacao } from "../../store/types/simulacaoTypes";
import { Grid } from "@material-ui/core";
import ImportacaoExportacaoButtons from "./importacao-exportacao/ImportacaoExportacaoButtons";

const Canvas = (props: Props) => {
  const containerRef = React.useRef(null);

  const [startCanvas, setStartCanvas] = React.useState(false);

  const restartSVGRef = React.useRef<((value: IGrafo, simulacao: ISimulacao) => void) | null>(null);

  const handleStartCanvas = (value: boolean) => {
    setStartCanvas(value);
  }

  const restartCanvas = () => {
    if (restartSVGRef.current !== null) {
      restartSVGRef.current(props.data, props.simulacao);
    }
  }

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current && startCanvas) {
      const { destroy, restart } = runGraph(containerRef.current, props);
      handleStartCanvas(false);
      restartSVGRef.current = restart;
      destroyFn = destroy;
    }
    return destroyFn;
  });

  restartCanvas();
  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Options handleStartCanvas={handleStartCanvas}></Options>
        <div ref={containerRef} className={styles.container}></div>
      </Grid>
      <Grid item xs={12}>
        <ImportacaoExportacaoButtons></ImportacaoExportacaoButtons>
      </Grid>
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

export default connector(Canvas)
