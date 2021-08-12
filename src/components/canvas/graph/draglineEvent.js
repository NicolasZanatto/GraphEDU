import * as d3 from "d3";

  var mousedownNode = null;

  var dragLine = null;

  export const initDragLine = (svg) =>{
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
  
  export const beginDragLine = (d, svg) => {
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


  export const hideDragLine = (restart) => {
    dragLine.classed("hidden", true);
    mousedownNode = null;
    restart();
  }
  //no need to call hideDragLine() and restart() in endDragLine
  //mouseup on vertices propagates to svg which calls hideDragLine

  export const endDragLine = (d, links, restart) => {
    if (!mousedownNode || mousedownNode === d) return;
    //return if link already exists
    for (let i = 0; i < links.length; i++) {
      var l = links[i];
      if (l.source === mousedownNode && l.target === d) return;
    }

    var value = prompt("Digite um valor entre 0 a 100 para a aresta");
    var newLink = { id: links.length + 1, source: mousedownNode, target: d, value: value };
    links.push(newLink);
    restart();
  }