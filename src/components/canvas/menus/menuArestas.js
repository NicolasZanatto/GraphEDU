import * as d3 from "d3";
import { menuFactory } from "./menuFactory";
import { EditEdgeValue } from "../grafo/arestas/events/editarArestaPesoEvent";
import { RemoveEdgeValue } from "../grafo/arestas/events/removerArestaEvent";
import { changeEdgeDirection } from "../grafo/arestas/events/trocarDirecaoArestaEvent";
const menuArestasDirigidasValoradasItens = [
    {
        title: 'Trocar Direção',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            console.log("Trocar Direção", d);
            changeEdgeDirection(links, d, actions.changeEdgeDirectionAction)
            d3.event.preventDefault();
        }
    },
    {
        title: 'Editar Peso',
        action: (nodes, links, d, actions, restart) => {
            // TODO: add any action you want to perform
            EditEdgeValue(links, d, actions.editEdgeAction, restart);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Aresta',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            RemoveEdgeValue(links, d, actions.removeEdgeAction)
            d3.event.preventDefault();
        }
    }
];


const menuArestasDirigidaNaoValoradaItens = [
    {
        title: 'Trocar Direção',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            console.log("Trocar Direção", d);
            changeEdgeDirection(links, d, actions.changeEdgeDirectionAction)
            d3.event.preventDefault();
        }
    },
    {
        title: 'Remover Aresta',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            RemoveEdgeValue(links, d, actions.removeEdgeAction)
            d3.event.preventDefault();
        }
    }
];

const menuArestasNaoDirigidasValoradasItens = [
    {
        title: 'Editar Peso',
        action: (nodes, links, d, actions, restart) => {
            // TODO: add any action you want to perform
            EditEdgeValue(links, d, actions.editEdgeAction, restart);
            d3.event.preventDefault();
        }

    },
    {
        title: 'Remover Aresta',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            RemoveEdgeValue(links, d, actions.removeEdgeAction)
            d3.event.preventDefault();
        }
    }
];



const menuArestasNaoDirigidaNaoValoradaItens = [
    {
        title: 'Remover Aresta',
        action: (nodes, links, d, actions) => {
            // TODO: add any action you want to perform
            RemoveEdgeValue(links, d, actions.removeEdgeAction)
            d3.event.preventDefault();
        }
    }
];

export const mostrarMenuArestas = (nodes, links, d, width, height, svgId, actions, dirigido, valorado) => {

    const menus = [
        { dirigido: true, valorado: true, menuEspecifico: menuArestasDirigidasValoradasItens },
        { dirigido: true, valorado: false, menuEspecifico: menuArestasDirigidaNaoValoradaItens },
        { dirigido: false, valorado: true, menuEspecifico: menuArestasNaoDirigidasValoradasItens },
        { dirigido: false, valorado: false, menuEspecifico: menuArestasNaoDirigidaNaoValoradaItens }
    ];

    const menuArestasItens = menus.filter(o => { return o.dirigido === dirigido && o.valorado === valorado });

    menuFactory(d3.event.pageX - width, d3.event.pageY - height / 1.5, menuArestasItens[0].menuEspecifico, nodes, links, d, svgId, actions);
    d3.event.preventDefault();

    return links;
}
