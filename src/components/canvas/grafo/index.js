import * as d3 from "d3";
import { mostrarMenuVertices } from "./menus/menuVertices";
import { mostrarMenuArestas } from "./menus/menuArestas";
import styles from "./../canvas.module.css";
import { tickPesoAresta, tickEdge } from "./utils/mathHelper";
import { drag } from "./vertices/events/moverVerticesEvent";
import { hideDragLine, initDragLine } from "./arestas/events/desenharArestaEvent";
import { adicionarVertice } from "./vertices/events/adicionarVerticeEvent";
import { adicionarAresta } from "./arestas/events/adicionarArestaEvent";
import { UpdateEdgeValueOnSVG } from "./arestas/events/editarArestaPesoEvent";
import { AtualizarCoresGrafo, AtualizarVerticesEArestasGrafo } from "./utils/atualizarGrafo";

export function runGraph(container, props) {
  const idSVG = "graphSvg";
  let data = props.data;
  let ehGrafoDirigido = data.dirigido;
  let ehGrafoValorado = data.valorado;
  let modoCriacao;
  const actions = props;
  let links = data.links.map((d) => Object.assign({}, d));
  let nodes = data.nodes.map((d) => Object.assign({}, d));
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("id", idSVG)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .on("mousedown", d => adicionarVertice(nodes, idSVG, actions.addNodeAction, modoCriacao))
    .on("mouseup", d => hideDragLine(restart))
    .on("mouseleave", d => hideDragLine(restart))
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform);
    }))
    .on("dblclick.zoom", null)
    .on('drag', null);

  let simulation;



  var arestas = svg.append("g").selectAll(`.edge`);
  var pesoArestas = svg.append("g").selectAll(`.${styles.pesoArestas}`);
  var vertices = svg.append("g").selectAll(".vertex");


  function restart() {
    simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", () => {
        //update link positions
        arestas
          .attr("d", d => tickEdge(d, ehGrafoDirigido));

        vertices.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        pesoArestas.attr("transform", tickPesoAresta);

      });

    initDragLine(svg, ehGrafoDirigido);

    //arestas 
    arestas = arestas.data(links, function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });
    arestas.exit().remove();

    var ed = arestas
      .enter()
      .append("path")
      .attr("marker-end", "url(#arrowhead)")
      .attr("fill", "none")
      .attr("stroke", "#000000")
      .attr("stroke-width", 3.8)
      .attr("class", "edge")
      .attr("id", d => "path" + d.id)
      .on("contextmenu", (d) => { mostrarMenuArestas(nodes, links, d, width, height, '#graphSvg', actions, data.dirigido, ehGrafoDirigido); })
      .on("mouseover", (d) => { d3.select("#path" + d.id).attr("stroke", "#f11303b6") })
      .on("mouseout", (d) => { d3.select("#path" + d.id).attr("stroke", "black") });

    ed.append("title").text(function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });

    arestas = ed.merge(arestas);


    //pesoArestas
    pesoArestas = pesoArestas.data(links, function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });

    pesoArestas.exit().remove();

    var lt = pesoArestas.enter()
      .append("text")
      .attr("class", styles.pesoArestas)

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

    pesoArestas = lt.merge(pesoArestas);


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
      .attr("id", d => `vertice${d.id}`)
      .attr("class", "vertex")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .on("click", d => adicionarAresta(d, links, actions.addEdgeAction, data.dirigido, ehGrafoValorado, modoCriacao))
      .on("contextmenu", (d) => { mostrarMenuVertices(nodes, links, d, width, height, '#graphSvg', actions); })
      .call(drag(simulation));

    g.append("circle")
      .attr("class", "CircleCanvas")
      .attr("r", 13)
      .attr("fill", "#FFF1D0")
      .attr("stroke", "black")

    g.append("text")
      .attr("class", `${styles.nodeText}`)
      .attr("text-anchor", "middle")
      .attr("y", 3)
      .text(function (d) {
        return d.id;
      });

    g.append("text")
      .attr("class", "informacoes-vertice")
      .attr("font-size", "15px")
      .attr("font-weight", "lighter")
      .attr("text-anchor", "middle")
      .attr("y", 50);

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
    restart: (dataAtualizada, simulacao) => {
      UpdateEdgeValueOnSVG(links);
      AtualizarCoresGrafo(dataAtualizada.verticeInicial, dataAtualizada.verticeFinal, nodes, links, simulacao, styles);
      AtualizarVerticesEArestasGrafo(nodes, links, dataAtualizada.nodes, dataAtualizada.links);
      ehGrafoDirigido = dataAtualizada.dirigido;
      modoCriacao = dataAtualizada.modoCriacao;
      restart();
    }
  };
}
