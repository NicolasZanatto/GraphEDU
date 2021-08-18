import * as d3 from "d3";
import { menuFactory } from "./menuFactory";
import { EditEdgeValue } from "../grafo/arestas/acoes/editarArestaPeso";
const menuArestasItens = [
    {
        title: 'Trocar Direção',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            console.log("Trocar Direção", d);
            d3.event.preventDefault();
        }
    },
    {
        title: 'Editar Peso',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            EditEdgeValue(links, d, actions.editEdgeAction);
            console.log("Editar Peso", links);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Aresta',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            console.log("Remover Aresta", d);
            d3.event.preventDefault();
        }

    }
];

export const mostrarMenuArestas = (nodes, links, d, width, height, svgId, actions) => {
    menuFactory(d3.event.pageX - width, d3.event.pageY - height / 1.5, menuArestasItens, nodes, links, d, svgId, actions);
    d3.event.preventDefault();

    return links;
}
