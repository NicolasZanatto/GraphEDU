import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";
import { IUpdateDFS, IUpdateBFS, IUpdateDIJKSTRA, IUpdateBELLMANFORD, ISetPasso, ISetQntdPassos, IUpdateFLOYDWARSHALL } from "../types/simulacaoTypes";
import { IRetornoDFS } from "../types/dfsTypes";
import { IRetornoBFS } from "../types/bfsTypes";
import { IRetornoDIJKSTRA } from "../types/dijkstraTypes";
import { IRetornoBELLMANFORD } from "../types/bellmanFordTypes";
import { IRetornoFLOYDWARSHALL } from "../types/floydWarshallTypes";

export const updateDFSAction = (retorno: IRetornoDFS): IUpdateDFS => {
    return {
        type: "UPDATE_DFS",
        payload: retorno
    }
}

export const updateBFSAction = (retorno: IRetornoBFS): IUpdateBFS => {
    return {
        type: "UPDATE_BFS",
        payload: retorno
    }
}

export const updateDIJKSTRAAction = (retorno: IRetornoDIJKSTRA): IUpdateDIJKSTRA => {
    return {
        type: "UPDATE_DIJKSTRA",
        payload: retorno
    }
}

export const updateBELLMANFORDAction = (retorno: IRetornoBELLMANFORD): IUpdateBELLMANFORD => {
    return {
        type: "UPDATE_BELLMANFORD",
        payload: retorno
    }
}

export const updateFLOYDWARSHALLAction = (retorno: IRetornoFLOYDWARSHALL): IUpdateFLOYDWARSHALL => {
    return {
        type: "UPDATE_FLOYDWARSHALL",
        payload: retorno
    }
}

export const setPassoAction = (passo: number): ISetPasso => {
    return {
        type: "SET_PASSO",
        payload: passo
    }
}
export const setQntdPassosAction = (qntdPassos: number): ISetQntdPassos => {
    return {
        type: "SET_QNTD_PASSOS",
        payload: qntdPassos
    }
}

export const SetAlgoritmoAction = (eAlgoritmo: EAlgoritmos) => {
    return {
        type: "SET_ALGORITMO",
        payload: eAlgoritmo
    }
}