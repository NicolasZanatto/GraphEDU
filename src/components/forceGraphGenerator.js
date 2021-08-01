import * as d3 from "d3";
import data from "../data/data.json";
import { mostrarMenuVertices } from "../components/menus/menuVertices";

import "@fortawesome/fontawesome-free/css/all.min.css";

export function runForceGraph(container) {
  var links = data.links.map((d) => Object.assign({}, d));
  var nodes = data.nodes.map((d) => Object.assign({}, d));
  var mousedownNode = null;
  var singleClickTimer;
  let numClicks = 0;
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const color = () => { return "#000"; };

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
          gender: "male",
          id: nodes.length + 1,
          index: 0,
          name: "Andy",
          x: x,
          y: y
        };
        nodes = nodes.concat(newVertice);
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

    d3.select(this)
      .attr("class", "node-dblClicked")
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

    var newLink = { source: mousedownNode, target: d };
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
    .force("charge", d3.forceManyBody().strength(-150))
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
    .attr("d", "M0,0L0,0");

  var edges =
    svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll(".edge");

  var vertices = svg.append("g").selectAll(".vertex");

  simulation.on("tick", () => {
    //update link positions
    edges
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    vertices.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
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
      .append("line")
      .attr("class", "edge")
      .attr("stroke-width", d => Math.sqrt(d.value));

    ed.append("title").text(function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });

    edges = ed.merge(edges);


    //vertices are known by id
    vertices = vertices.data(nodes, function (d) {
      return d.id;
    });

    vertices.exit().remove();

    vertices.selectAll("text").text(function (d) {
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
      .attr("fill", color)
      .attr("class", "node")

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 3)
      .text(function (d) {
        return d.id;
      });

    vertices = g.merge(vertices);

    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(0.8).restart();

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
