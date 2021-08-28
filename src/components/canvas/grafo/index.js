import * as d3 from "d3";
import { mostrarMenuVertices } from "../menus/menuVertices";
import { mostrarMenuArestas } from "../menus/menuArestas";
import styles from "./../canvas.module.css";
import { tickPesoAresta, tickEdge } from "../utils/mathHelper";
import { drag } from "./vertices/events/moverVerticesEvent";
import { updateDragLine, hideDragLine, initDragLine } from "./arestas/events/desenharArestaEvent";
import { adicionarVertice } from "./vertices/events/adicionarVerticeEvent";
import { adicionarAresta } from "./arestas/events/adicionarArestaEvent";
import { UpdateEdgeValueOnSVG } from "./arestas/events/editarArestaPesoEvent";

export function runGraph(container, props) {
  const idSVG = "graphSvg";
  const data = props.data;
  console.log("Grafo props", props)
  const actions = props;
  var links = data.links.map((d) => Object.assign({}, d));
  var nodes = data.nodes.map((d) => Object.assign({}, d));
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const color = d3.schemeCategory10;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("id", idSVG)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .on("mousedown", d => adicionarVertice(nodes, idSVG, actions.addNodeAction))
    .on("mousemove", d => updateDragLine())
    .on("mouseup", d => hideDragLine(restart))
    .on("mouseleave", d => hideDragLine(restart))
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform);
    }))
    .on("dblclick.zoom", null);



  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .on("tick", () => {
      //update link positions
      edges
        .attr("d", d => tickEdge(d, data.dirigido));

      vertices.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

      edgeText.attr("transform", tickPesoAresta);

    });

  initDragLine(svg, data.dirigido);

  var edges = svg.append("g").selectAll(`.${styles.edge}`);

  var edgeText = svg.append("g").selectAll(`.${styles.edgeText}`);

  var vertices = svg.append("g").selectAll(".vertex");

  function restart() {
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
      .on("contextmenu", (d) => { mostrarMenuArestas(nodes, links, d, width, height, '#graphSvg', actions, data.dirigido, data.valorado); })

    ed.append("title").text(function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });

    edges = ed.merge(edges);


    //edgeText
    edgeText = edgeText.data(links, function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });

    edgeText.exit().remove();

    var lt = edgeText.enter()
      .append("text")
      .attr("class", styles.edgeText)

      .attr("x", "50")
      .attr("dy", "-2")
      .attr("text-anchor", "middle")

    lt.append("textPath")
      .attr("class", "textpath")
      .attr("id", d => "textpath" + d.id)
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
      .on("click", d => adicionarAresta(d, links, actions.addEdgeAction, data.dirigido, data.valorado))
      .on("contextmenu", (d) => { mostrarMenuVertices(nodes, links, d, width, height, '#graphSvg', actions); })
      .call(drag(simulation));

    g.append("circle")
      .attr("r", 15)
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
    simulation.force("link").links(links);
    simulation.alpha(0.05).restart();

  }

  restart();

  return {
    destroy: () => {
      simulation.stop();
    },
    restart: (data) => {
      UpdateEdgeValueOnSVG(links);
      console.log("Canvas Index:", data);
      restart();
    }
  };
}
