import React from "react";
import { runGraph } from "./grafo";
import styles from "./canvas.module.css";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../store/actions/canvasAction";
import Options from "./opcoes";
import { ICanvas, IGrafo } from "../../store/types/canvasTypes";
import { Dispatch } from 'redux';


const Canvas = (props : Props) => {
  const containerRef = React.useRef(null);

  const [startCanvas, setStartCanvas] = React.useState(false);

  const restartSVGRef = React.useRef<((value: IGrafo) => void) | null >(null);

  const handleStartCanvas = (value : boolean) => {
    setStartCanvas(value);
  }

  const restartCanvas = () => {
    if (restartSVGRef.current !== null) {
      restartSVGRef.current(props.data);
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
    <div className={styles.canvas}>
      <Options handleStartCanvas={handleStartCanvas}></Options>
      <div ref={containerRef} className={styles.container}>
      </div>
    </div>
  );
}

const mapStateToProps = (state : ICanvas) => ({
  data: state.canvas
});

const mapDispatchToProps = (dispatch : Dispatch) =>
  bindActionCreators(CanvasActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(Canvas)
