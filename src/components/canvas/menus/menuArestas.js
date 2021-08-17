import * as d3 from "d3";
import { menuFactory } from "../utils/menuFactory";
import { EditEdgeValue } from "../graph/edit-edge-value";
const menuArestasItens = [
    {
        title: 'Trocar Direção',
        action: (nodes, links, d) => {
            // TODO: add any action you want to perform
            console.log("Trocar Direção", d);
            d3.event.preventDefault();
        }
    },
    {
        title: 'Editar Peso',
        action: (nodes, links, d) => {
            // TODO: add any action you want to perform
            console.log("Editar Peso", d);
            EditEdgeValue(links, d);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Aresta',
        action: (nodes, links, d) => {
            // TODO: add any action you want to perform
            console.log("Remover Aresta", d);
            d3.event.preventDefault();
        }

    }
];

export const mostrarMenuArestas = (nodes, links, d, width, height, svgId) => {
    menuFactory(d3.event.pageX - width, d3.event.pageY - height / 1.5, menuArestasItens, nodes, links, d, svgId);
    console.log("links", links)
    d3.event.preventDefault();

    return links;
}
