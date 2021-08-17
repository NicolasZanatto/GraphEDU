import React from "react";
import { runGraph } from "./graph/";
import styles from "./canvas.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../store/actions/canvasAction";
import Options from "./options";

const Canvas = ({ data, addNodeAction, addEdgeAction, removeNodeAction }) => {
  const containerRef = React.useRef(null);
  const carregarD3Ref = React.useRef(true);
  const restartSVGRef = React.useRef(null);

  const restartCanvas = () => {
    if (restartSVGRef.current == null) return;

    restartSVGRef.current(data);
  }

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current && carregarD3Ref.current) {
      const { destroy, restart } = runGraph(containerRef.current, data, addNodeAction, addEdgeAction, removeNodeAction);
      carregarD3Ref.current = false;
      restartSVGRef.current = restart;
      destroyFn = destroy;
    }

    return destroyFn;
  });

  restartCanvas();
  return (
    <div className={styles.canvas}>
      <Options restartCanvas={restartSVGRef.current}></Options>
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
