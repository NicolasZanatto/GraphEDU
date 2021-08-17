export function addNodeAction(vertice) {
    return {
        type: 'ADD_NODE',
        vertice
    }
}

export function removeNodeAction(aresta) {
    return {
        type: 'REMOVE_NODE',
        payload: aresta
    }
}

export function addEdgeAction(aresta) {
    return {
        type: 'ADD_EDGE',
        payload: aresta
    }
}
export function removeEdgeAction(aresta) {
    return {
        type: 'REMOVE_EDGE',
        payload: aresta
    }
}


//Options
export function optionValoradoAction(valor) {
    return {
        type: 'OPTION_VALORADO',
        payload: valor
    }
}

export function optionDirigidoAction(valor) {
    return {
        type: 'OPTION_DIRIGIDO',
        payload: valor
    }
}