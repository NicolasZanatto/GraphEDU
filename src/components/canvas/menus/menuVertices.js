import * as d3 from "d3";
import { menuFactory } from "../utils/menuFactory";

const menuVerticesItens = [
    {
        title: 'Vértice Inicial',
        action: (d) => {
            // TODO: add any action you want to perform
            console.log("Vertice Inicial", d);
            d3.event.preventDefault();
        }
    },
    {
        title: 'Vértice Final',
        action: (d) => {
            // TODO: add any action you want to perform
            console.log("Vertice Final", d);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Vértice',
        action: (d) => {
            // TODO: add any action you want to perform
            console.log("Remover Vértice", d);
            d3.event.preventDefault();
        }

    }
];

export const mostrarMenuVertices = (d, width, height, svgId) => {
    menuFactory(d3.event.pageX - width / 2, d3.event.pageY - height / 1.5, menuVerticesItens, d, svgId);
    d3.event.preventDefault();
}
