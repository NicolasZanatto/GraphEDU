import { Action } from "redux";


export interface ISimulacao {
    dfs: IRetornoDFS
}

export interface IRetornoDFS {
    caminho: Array<ICaminho>,
    passo: number
}

export interface ICaminho {
    verticeInicial: number,
    verticeFinal: number
}

export interface IUpdateDFS extends Action {
    type: "UPDATE_DFS",
    payload: IRetornoDFS
};

export type ISimulacaoAction = | IUpdateDFS;