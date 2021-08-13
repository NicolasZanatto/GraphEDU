export function addNodeAction(vertice) {
    return {
        type: 'ADD_NODE',
        vertice
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