import * as d3 from "d3";
import { menuFactory } from "./menuFactory";
import { removerVertice } from "../grafo/vertices/events/removerVerticeEvent";
import { selecionarVerticeInicial } from "../grafo/vertices/events/selecionarVerticeInicialEvent";
import { selecionarVerticeFinal } from "../grafo/vertices/events/selecionarVerticeFinalEvent";

const menuVerticesItens = [
    {
        title: 'Vértice Inicial',
        action: (nodes, links, verticeSelecionado, actions) => {
            selecionarVerticeInicial(verticeSelecionado, actions.selectStartNodeAction);
            d3.event.preventDefault();
        }
    },
    {
        title: 'Vértice Final',
        action: (vertices, arestas, verticeSelecionado, actions) => {
            selecionarVerticeFinal(verticeSelecionado, actions.selectFinalNodeAction);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Vértice',
        action: (nodes, links, verticeSelecionado, actions) => {
            removerVertice(nodes, links, verticeSelecionado, actions.removeNodeAction, actions.removeEdgeAction);
            d3.event.preventDefault();
        }

    }
];

export const mostrarMenuVertices = (nodes, links, verticeSelecionado, width, height, svgId, actions) => {
    menuFactory(d3.event.pageX - width, d3.event.pageY - height / 1.5, menuVerticesItens, nodes, links, verticeSelecionado, svgId, actions);
    d3.event.preventDefault();
    return nodes;
}
