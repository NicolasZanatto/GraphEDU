import { IRetornoDFS, IUpdateDFS } from "../types/simulacaoTypes";

export const updateDFSAction = (retorno: IRetornoDFS): IUpdateDFS => {
    return {
        type: "UPDATE_DFS",
        payload: retorno
    }
}