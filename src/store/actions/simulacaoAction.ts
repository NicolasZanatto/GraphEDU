import { IRetornoDFS, IUpdateDFS, ISetPasso } from "../types/simulacaoTypes";

export const updateDFSAction = (retorno: IRetornoDFS): IUpdateDFS => {
    return {
        type: "UPDATE_DFS",
        payload: retorno
    }
}

export const setPassoAction = (passo: number): ISetPasso => {
    return {
        type: "SET_PASSO",
        payload: passo
    }
}