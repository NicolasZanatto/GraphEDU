import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";
import { IUpdateDFS, IUpdateBFS, ISetPasso, ISetQntdPassos } from "../types/simulacaoTypes";
import { IRetornoDFS } from "../types/dfsTypes";
import { IRetornoBFS } from "../types/bfsTypes";

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