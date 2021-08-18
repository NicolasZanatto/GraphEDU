import * as d3 from "d3";
import { addEdgeValue } from "../acoes/adicionarArestaPeso";

var mousedownNode = null;

var dragLine = null;

export const initDragLine = (svg) => {
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

export const beginDragLine = (d) => {
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


export const updateDragLine = () => {
  // var coords = d3.mouse(d3.event.currentTarget);
  if (!mousedownNode) return;
  // dragLine.attr(
  //   "d",
  //   "M" +
  //   mousedownNode.x +
  //   "," +
  //   mousedownNode.y +
  //   "L" +
  //   coords[0] +
  //   "," +
  //   coords[1]
  // );
}


export const hideDragLine = (restart, data) => {
  dragLine.classed("hidden", true);
  mousedownNode = null;
  console.log("HideDragLine", data);
  restart(data);
}
//no need to call hideDragLine() and restart() in endDragLine
//mouseup on vertices propagates to svg which calls hideDragLine

export const endDragLine = (d, links, addEdgeAction) => {
  if (!mousedownNode || mousedownNode === d) return;
  //return if link already exists
  for (let i = 0; i < links.length; i++) {
    var l = links[i];
    if (l.source === mousedownNode && l.target === d) return;
  }

  addEdgeValue(links, mousedownNode, d, addEdgeAction)
}