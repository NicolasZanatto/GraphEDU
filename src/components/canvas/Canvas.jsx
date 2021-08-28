import React from "react";
import { runGraph } from "./grafo";
import styles from "./canvas.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../store/actions/canvasAction";
import Options from "./opcoes";

const Canvas = ({ data, addNodeAction, addEdgeAction, removeNodeAction, editEdgeAction, removeEdgeAction, changeEdgeDirectionAction }) => {
  const containerRef = React.useRef(null);
  const actions = { addNodeAction, addEdgeAction, removeNodeAction, editEdgeAction, removeEdgeAction, changeEdgeDirectionAction }

  const [startCanvas, setStartCanvas] = React.useState(false);

  const restartSVGRef = React.useRef(null);

  const handleStartCanvas = (value) => {
    setStartCanvas(value);
  }

  const restartCanvas = () => {
    if (restartSVGRef.current == null) return;

    restartSVGRef.current(data);
  }

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current && startCanvas) {
      const { destroy, restart } = runGraph(containerRef.current, data, actions);
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

const mapStateToProps = state => ({
  data: state.canvas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CanvasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
