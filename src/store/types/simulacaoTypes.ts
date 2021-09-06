import { Action } from "redux";
import { IVertice } from "./canvasTypes";


export interface ISimulacao {
    dfs: IRetornoDFS,
    passo: number

}

export interface IRetornoDFS {
    caminho: Array<ICaminho>
}

export interface ICaminho {
    verticeS?: number,
    verticeV?: number,
    linha: number,
    listaAdj: Array<number>
    listaVisitados: Array<IVIsitadosDFS>
}

export interface IVIsitadosDFS {
    idVertice: number;
    visitado: boolean;
}

export interface IUpdateDFS extends Action {
    type: "UPDATE_DFS",
    payload: IRetornoDFS
};

export interface ISetPasso extends Action {
    type: "SET_PASSO",
    payload: number
};

export type ISimulacaoAction = | IUpdateDFS | ISetPasso;