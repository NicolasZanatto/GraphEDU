import React from "react";
import { runForceGraph } from "./forceGraphGenerator";
import styles from "./forceGraph.module.css";

export function ForceGraph({ linksData, nodesData, nodeHoverTooltip }) {
  const [nodes, setNodes] = React.useState(nodesData);
  const containerRef = React.useRef(null);

  const handleSetNodes = (e) => {
    console.log("handle",[...nodes, e.Node]);  
    setNodes([...nodes, e.Node])};

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodes,handleSetNodes, nodeHoverTooltip);
      destroyFn = destroy;
    }

    return destroyFn;
  }, [handleSetNodes,linksData,nodeHoverTooltip,nodes]);

  return <div ref={containerRef} className={styles.container} />;
}
