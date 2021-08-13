import React from "react";
import { runGraph } from "./graph/";
import styles from "./canvas.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../store/actions/canvasAction";

const Canvas = ({ data, addNodeAction }) => {
  const containerRef = React.useRef(null);
  const carregarD3Ref = React.useRef(true);
  const restartSVGRef = React.useRef(null);
  var teste = 0;
  const handleClick = () => {
    teste = !teste;
    restartSVGRef.current(teste);
  }

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current && carregarD3Ref.current) {
      const { destroy, restart } = runGraph(containerRef.current, data, addNodeAction);
      carregarD3Ref.current = false;
      restartSVGRef.current = restart;
      destroyFn = destroy;
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
  data: state.canvas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CanvasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
