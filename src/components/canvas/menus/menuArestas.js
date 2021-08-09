import * as d3 from "d3";
import { menuFactory } from "../utils/menuFactory";

const menuArestasItens = [
    {
        title: 'Trocar Direção',
        action: (d) => {
            // TODO: add any action you want to perform
            console.log("Trocar Direção", d);
            d3.event.preventDefault();
        }
    },
    {
        title: 'Editar Peso',
        action: (d) => {
            // TODO: add any action you want to perform
            console.log("Editar Peso", d);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Aresta',
        action: (d) => {
            // TODO: add any action you want to perform
            console.log("Remover Aresta", d);
            d3.event.preventDefault();
        }

    }
];

export const mostrarMenuArestas = (d, width, height, svgId) => {
    menuFactory(d3.event.pageX - width / 2, d3.event.pageY - height / 1.5, menuArestasItens, d, svgId);
    d3.event.preventDefault();
}
