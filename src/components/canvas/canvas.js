import React from "react";
import { runGraph } from "./canvasGraph";
import styles from "./canvas.module.css";

export function Canvas() {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runGraph(containerRef.current);
      destroyFn = destroy;
    }

    return destroyFn;
  });

  return (
    <div ref={containerRef} className={styles.container}>
    </div>
  );
}
