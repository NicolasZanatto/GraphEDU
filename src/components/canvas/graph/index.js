import * as d3 from "d3";
// import data from "../../data/data.json";
import { mostrarMenuVertices } from "../menus/menuVertices";
import { mostrarMenuArestas } from "../menus/menuArestas";
import styles from "./../canvas.module.css";
import { xAngle, isVector } from "./../utils/mathHelper";
import { drag } from "./dragEvent";
import {beginDragLine, updateDragLine, endDragLine, hideDragLine, initDragLine} from "./draglineEvent";

export function runGraph(container, data, addNodeAction) {
  var teste;
  var links = data.links.map((d) => Object.assign({}, d));
  var nodes = data.nodes.map((d) => Object.assign({}, d));
  var singleClickTimer;
  let numClicks = 0;
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const color = d3.schemeCategory10;


  const addNode =
    () => {
      if (d3.event.button === 0) {
        var coords = d3.mouse(d3.event.currentTarget);

        var newVertice = {

          id: nodes.length + 1,
          x: coords[0],
          y: coords[1],
          fx: coords[0],
          fy: coords[1]
        };
        nodes = nodes.concat(newVertice);

        addNodeAction(newVertice);
        restart();
      }
    }
  const clickEvent = (d) => {
    console.log("d", this); // target
    numClicks++;
    if (numClicks === 1) {
      singleClickTimer = setTimeout(() => {
        numClicks = 0;
        endDragLine(d, links, restart);
      }, 400);
    } else if (numClicks === 2) {
      clearTimeout(singleClickTimer);
      numClicks = 0;
      beginDragLine(d, svg);
    }
  }

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("id", "graphSvg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .on("mousedown", addNode)
    .on("mousemove", d => updateDragLine())
    .on("mouseup", d => hideDragLine(restart))
    .on("mouseleave", d => hideDragLine(restart))
  // .call(d3.zoom().on("zoom", function () {
  //   svg.attr("transform", d3.event.transform);
  // }))

  initDragLine(svg);

  var edges =
    svg.append("g")
      .selectAll(`.${styles.edge}`);

  var edgeText = svg.append("g").selectAll(`.${styles.edgeText}`);

  var vertices = svg.append("g").selectAll(".vertex");

  simulation.on("tick", () => {
    //update link positions
    edges
      .attr("d", d => `M${d.source.x} ${d.source.y} ${d.target.x} ${d.target.y}`);

    vertices.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });


    edgeText.attr("transform", function (d) {
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

    console.log(teste, teste);


    //edges 

    edges = edges.data(links, function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });
    edges.exit().remove();

    var ed = edges
      .enter()
      .append("path")
      .attr("marker-end", "url(#arrowhead)")
      .attr("class", styles.edge)
      .attr("id", d => "path" + d.id)
      .on("contextmenu", (d) => { mostrarMenuArestas(d, width, height, '#graphSvg') })

    ed.append("title").text(function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });

    edges = ed.merge(edges);


    //edgeText
    edgeText = edgeText.data(links);

    edgeText.exit().remove();

    var lt = edgeText.enter()
      .append("text")
      .attr("class", styles.edgeText)

      .attr("x", "50")
      .attr("dy", "-2")
      .attr("text-anchor", "middle")

    lt.append("textPath")
      .attr("xlink:href", d => "#path" + d.id)
      .text(function (d) {
        return d.value;
      });

    edgeText = lt.merge(edgeText);


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
      .attr("stroke", "black")

    g.append("text")
      .attr("class", `${styles.nodeText}`)
      .attr("text-anchor", "middle")
      .attr("y", 3)
      .text(function (d) {
        return d.id;
      });

    vertices = g.merge(vertices);

    simulation.nodes(nodes);
    // simulation.force("link").links(links);
    simulation.alpha(0.05).restart();

  }

  restart();

  return {
    destroy: () => {
      simulation.stop();
    },
    restart: (t) => {
      teste = t;
      return restart();
    }
  };
}
