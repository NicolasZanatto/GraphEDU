import React from "react";
import { runGraph } from "./graph/";
import styles from "./canvas.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../store/actions/canvasAction";

const Canvas = ({ data, addNodeAction }) => {
  const containerRef = React.useRef(null);
  var teste = 0;
  let restartCanvas;
  const handleClick = () => {
    teste = !teste;
    restartCanvas(teste);
  }

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy, restart } = runGraph(containerRef.current, data, addNodeAction);
      destroyFn = destroy;
      restartCanvas = restart;
    }
    
    return destroyFn;
  });

  return (
    <div ref={containerRef} className={styles.container}>
      <button onClick={handleClick}>Clique aqui</button>
    </div>
  );
}

const mapStateToProps = state => ({
  data: state.canvas.grafo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CanvasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
