import {IVertice, IAresta, IAddNode} from "../types/canvasTypes";

export const addNodeAction = (vertice : IVertice) : IAddNode => {
    return {
        type: 'ADD_NODE',
        payload: vertice
    }
}

export function removeNodeAction(aresta : IAresta) {
    return {
        type: 'REMOVE_NODE',
        payload: aresta
    }
}

export function addEdgeAction(aresta : IAresta) {
    return {
        type: 'ADD_EDGE',
        payload: aresta
    }
}
export function editEdgeAction(aresta : IAresta) {
    return {
        type: 'EDIT_EDGE',
        payload: aresta
    }
}
export function removeEdgeAction(aresta : IAresta) {
    return {
        type: 'REMOVE_EDGE',
        payload: aresta
    }
}

export function changeEdgeDirectionAction(aresta : IAresta) {
    return {
        type: 'CHANGE_DIRECTION',
        payload: aresta
    }
}

//Options
export function optionValoradoAction(valor : Boolean) {
    return {
        type: 'OPTION_VALORADO',
        payload: valor
    }
}

export function optionDirigidoAction(valor : Boolean) {
    return {
        type: 'OPTION_DIRIGIDO',
        payload: valor
    }
}