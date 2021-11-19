import * as d3 from "d3";
import { addEdgeValue } from "./adicionarArestaPesoEvent";

var mousedownNode = null;

var dragLine = null;

export const initDragLine = (svg, dirigido) => {

  if (dirigido) {

    dragLine = svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 3.5)
      .attr("markerHeight", 3.5)
      .attr("orient", "auto")
      .append("path")
      .attr("class", "dragLine hidden")
      .attr("d", "M0,-5L10,0L0,5");
  }
  else {
    dragLine = svg
      .append("path")
      .attr("class", "dragLine hidden")
  }
}

export const setarVerticeOrigemEvent = (d) => {
  //to prevent call of addNode through svg
  d3.event.stopPropagation();
  //to prevent dragging of svg in firefox
  d3.event.preventDefault();

  if (d3.event.ctrlKey || d3.event.button !== 0) return;
  mousedownNode = d;
  // dragLine
  //   .classed("hidden", false)
  //   .attr(
  //     "d",
  //     "M" +
  //     mousedownNode.x +
  //     "," +
  //     mousedownNode.y +
  //     "L" +
  //     mousedownNode.x +
  //     "," +
  //     mousedownNode.y
  //   );
}





export const hideDragLine = (restart, data) => {
  dragLine.classed("hidden", true);
  mousedownNode = null;
  restart(data);
}
//no need to call hideDragLine() and restart() in endDragLine
//mouseup on vertices propagates to svg which calls hideDragLine

export const setarVerticeDestinoEvent = (d, links, addEdgeAction, dirigido, valorado) => {
  if (!mousedownNode || mousedownNode === d) return;
  //return if link already exists
  for (let i = 0; i < links.length; i++) {
    var l = links[i];
    // Verifica se é dirigido e se já existe aresta com o mesma origem e destino
    if (dirigido && l.source === mousedownNode && l.target === d) return;
    // Verifica se não é dirigido e se já existe alguma aresta entre a origem e o destino
    if (!dirigido && ((l.source === mousedownNode && l.target === d) || (l.source === d && l.target === mousedownNode))) return;
  }

  addEdgeValue(links, mousedownNode, d, addEdgeAction, valorado)
}