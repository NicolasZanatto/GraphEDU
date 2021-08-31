import { IRetornoDFS, IUpdateDFS,ISetPassoDFS } from "../types/simulacaoTypes";

export const updateDFSAction = (retorno: IRetornoDFS): IUpdateDFS => {
    return {
        type: "UPDATE_DFS",
        payload: retorno
    }
}

export const setPassoDFSAction = (passo: number): ISetPassoDFS => {
    return {
        type: "SET_PASSO_DFS",
        payload: passo
    }
}