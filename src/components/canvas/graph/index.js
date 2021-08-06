import * as d3 from "d3";
// import data from "../../data/data.json";
import { mostrarMenuVertices } from "../menus/menuVertices";
import styles from "./../canvas.module.css";
import { xAngle, isVector } from "./../utils/mathHelper";

export function runGraph(container, data, addNodeAction) {

  var links = data.links.map((d) => Object.assign({}, d));
  var nodes = data.nodes.map((d) => Object.assign({}, d));
  var mousedownNode = null;
  var singleClickTimer;
  let numClicks = 0;
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const color = d3.schemeCategory10;

  const drag = (simulation) => {
    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };


  const addNode =
    () => {
      if (d3.event.button === 0) {
        var x = d3.event.pageX;
        var y = d3.event.pageY;
        var newVertice = {

          id: nodes.length + 1,
          x: x,
          y: y
        };
        nodes = nodes.concat(newVertice);

        addNodeAction(newVertice);
        restart();
      }
    }


  const beginDragLine = (d) => {
    //to prevent call of addNode through svg
    d3.event.stopPropagation();
    //to prevent dragging of svg in firefox
    d3.event.preventDefault();

    if (d3.event.ctrlKey || d3.event.button !== 0) return;
    mousedownNode = d;
    dragLine
      .classed("hidden", false)
      .attr(
        "d",
        "M" +
        mousedownNode.x +
        "," +
        mousedownNode.y +
        "L" +
        mousedownNode.x +
        "," +
        mousedownNode.y
      );
  }

  const updateDragLine = () => {
    var coords = d3.mouse(d3.event.currentTarget);
    if (!mousedownNode) return;
    dragLine.attr(
      "d",
      "M" +
      mousedownNode.x +
      "," +
      mousedownNode.y +
      "L" +
      coords[0] +
      "," +
      coords[1]
    );
  }

  const hideDragLine = () => {
    dragLine.classed("hidden", true);
    mousedownNode = null;
    restart();
  }
  //no need to call hideDragLine() and restart() in endDragLine
  //mouseup on vertices propagates to svg which calls hideDragLine
  const endDragLine = (d) => {
    if (!mousedownNode || mousedownNode === d) return;
    //return if link already exists
    for (let i = 0; i < links.length; i++) {
      var l = links[i];
      if (
        (l.source === mousedownNode && l.target === d) ||
        (l.source === d && l.target === mousedownNode)
      ) {
        return;
      }
    }

    var newLink = { id: links.length + 1, source: mousedownNode, target: d, value: 0 };
    links.push(newLink);
    restart();
  }

  const clickEvent = (d) => {
    numClicks++;
    if (numClicks === 1) {
      singleClickTimer = setTimeout(() => {
        numClicks = 0;
        endDragLine(d);
      }, 400);
    } else if (numClicks === 2) {
      clearTimeout(singleClickTimer);
      numClicks = 0;
      beginDragLine(d);
    }
  }

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("id", "graphSvg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .on("mousedown", () => {
      addNode();
    })
    .on("mousemove", updateDragLine)
    .on("mouseup", hideDragLine)
    .on("mouseleave", hideDragLine)
  // .call(d3.zoom().on("zoom", function () {
  //   svg.attr("transform", d3.event.transform);
  // }))


  var dragLine = svg
    .append("path")
    .attr("class", "dragLine hidden")
    .attr("d", "M0 0 0 0");

  var edges =
    svg.append("g")
      .selectAll(`.${styles.edge}`);

  var linkText = svg.append("g").selectAll(`.${styles.edgeText}`);

  var vertices = svg.append("g").selectAll(".vertex");

  simulation.on("tick", () => {
    //update link positions
    edges
      .attr("d", d => `M${d.source.x} ${d.source.y} ${d.target.x} ${d.target.y}`);
    // .attr("x1", d => d.source.x)
    // .attr("y1", d => d.source.y)
    // .attr("x2", d => d.target.x)
    // .attr("y2", d => d.target.y);

    vertices.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });


    linkText.attr("transform", function (d) {
      // Checks just in case, especially useful at the start of the sim
      if (!(isVector(d.source) && isVector(d.target))) {
        return '';
      }

      // Get the geometric center of the text element
      var box = this.getBBox();
      var center = {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2
      };

      // Get the tangent vector
      var delta = {
        x: d.target.x - d.source.x,
        y: d.target.y - d.source.y
      };

      // Rotate about the center
      return 'rotate('
        + (-180 / Math.PI * xAngle(delta))
        + ' ' + center.x
        + ' ' + center.y
        + ')';
    });

  });


  function restart() {



    //edges 

    edges = edges.data(links, function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });
    edges.exit().remove();

    var ed = edges
      .enter()
      .append("path")
      .attr("class", styles.edge)
      .attr("id", d => "path" + d.id);

    ed.append("title").text(function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });

    edges = ed.merge(edges);


    //edgeText
    linkText = linkText.data(links);

    linkText.exit().remove();

    var lt = linkText.enter()
      .append("text")
      .attr("class", styles.edgeText)

      .attr("x", "50")
      .attr("dy", "-5")
      .attr("text-anchor", "middle")

    lt.append("textPath")
      .attr("xlink:href", d => "#path" + d.id)
      .text(function (d) {
        return d.value;
      });

    linkText = lt.merge(linkText);


    //vertices are known by id
    vertices = vertices.data(nodes, function (d) {
      return d.id;
    });

    vertices.exit().remove();

    vertices.selectAll(`.${styles.nodeText}`).text(function (d) {
      return d.id;
    });

    var g = vertices
      .enter()
      .append("g")
      .attr("class", "vertex")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("click", clickEvent)
      .on("contextmenu", (d) => { mostrarMenuVertices(d, width, height, '#graphSvg') })
      .call(drag(simulation));

    g.append("circle")
      .attr("r", 12)
      .attr("fill", d => color[d.id % 10])
      .attr("class", "node")

    g.append("text")
      .attr("class", `${styles.nodeText}`)
      .attr("text-anchor", "middle")
      .attr("y", 3)
      .text(function (d) {
        return d.id;
      });

    vertices = g.merge(vertices);

    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(0.3).restart();

  }

  restart();

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}
