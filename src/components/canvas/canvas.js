import React from "react";
import { runGraph } from "./graph/";
import styles from "./canvas.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CanvasActions from "../../store/actions/canvasAction";


const Canvas = ({ data, addNodeAction }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runGraph(containerRef.current, data, addNodeAction);
      destroyFn = destroy;
    }

    return destroyFn;
  });

  return (
    <div ref={containerRef} className={styles.container}>
    </div>
  );
}

const mapStateToProps = state => ({
  data: state.canvas.grafo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CanvasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
