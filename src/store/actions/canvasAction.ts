import { IVertice, IAresta, IGrafo, IAddNode, IRemoveNode, IAddEdge, IEditEdge, IRemoveEdge, IChangeDirection, IOptionValorado, IOptionDirigido, IStartNode, IFinalNode, ILimparGrafo, ISetarGrafo, IRestartGrafo } from "../types/canvasTypes";

// Vértices
export const addNodeAction = (vertice: IVertice): IAddNode => {
    return {
        type: 'ADD_NODE',
        payload: vertice
    }
}

export const removeNodeAction = (vertice: IVertice): IRemoveNode => {
    return {
        type: 'REMOVE_NODE',
        payload: vertice
    }
}

export const selectStartNodeAction = (idVertice: number): IStartNode => {
    return {
        type: 'SELECT_START_NODE',
        payload: idVertice
    }
}

export const selectFinalNodeAction = (idVertice: number): IFinalNode => {
    return {
        type: 'SELECT_FINAL_NODE',
        payload: idVertice
    }
}

//Arestas
export const addEdgeAction = (aresta: IAresta): IAddEdge => {
    return {
        type: 'ADD_EDGE',
        payload: aresta
    }
}
export const editEdgeAction = (aresta: IAresta): IEditEdge => {
    return {
        type: 'EDIT_EDGE',
        payload: aresta
    }
}
export const removeEdgeAction = (aresta: IAresta): IRemoveEdge => {
    return {
        type: 'REMOVE_EDGE',
        payload: aresta
    }
}

export const changeEdgeDirectionAction = (aresta: IAresta): IChangeDirection => {
    return {
        type: 'CHANGE_DIRECTION',
        payload: aresta
    }
}

//Options
export const optionValoradoAction = (valor: Boolean): IOptionValorado => {
    return {
        type: 'OPTION_VALORADO',
        payload: valor
    }
}

export const optionDirigidoAction = (valor: Boolean): IOptionDirigido => {
    return {
        type: 'OPTION_DIRIGIDO',
        payload: valor
    }
}

export const limparGrafoAction = (): ILimparGrafo => {
    return {
        type: "LIMPAR_GRAFO"
    }
}

export const setarGrafoAction = (valor: IGrafo): ISetarGrafo => {
    return {
        type: "SETAR_GRAFO",
        payload: valor
    }
}
export const restartGrafoAction = (valor: boolean): IRestartGrafo => {
    return {
        type: "RESTART_GRAFO",
        payload: valor
    }
}