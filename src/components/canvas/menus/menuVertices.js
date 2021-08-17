import * as d3 from "d3";
import { menuFactory } from "../utils/menuFactory";
import { removerVertice } from "../graph/vertices/remover-vertice";

const menuVerticesItens = [
    {
        title: 'Vértice Inicial',
        action: (nodes, links, verticeSelecionado) => {
            // TODO: add any action you want to perform

            d3.event.preventDefault();
        }
    },
    {
        title: 'Vértice Final',
        action: (vertices, arestas, verticeSelecionado) => {
            // TODO: add any action you want to perform
            console.log("Vertice Final", vertices, verticeSelecionado);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Vértice',
        action: (nodes, links, verticeSelecionado, removeNodeAction) => {

            removerVertice(nodes, links, verticeSelecionado, removeNodeAction);
            d3.event.preventDefault();
        }

    }
];

export const mostrarMenuVertices = (nodes, links, verticeSelecionado, width, height, svgId, removeNodeAction) => {
    menuFactory(d3.event.pageX - width, d3.event.pageY - height / 1.5, menuVerticesItens, nodes, links, verticeSelecionado, svgId, removeNodeAction);
    d3.event.preventDefault();
    return nodes;
}
