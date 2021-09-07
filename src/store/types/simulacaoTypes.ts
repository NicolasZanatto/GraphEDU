import { Action } from "redux";
import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";
import { IVertice } from "./canvasTypes";


export interface ISimulacao {
    dfs: IRetornoDFS,
    passo: number,
    tipoAlgoritmo?: EAlgoritmos
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

export interface ISetAlgoritmo extends Action {
    type: "SET_ALGORITMO",
    payload: EAlgoritmos
}

export type ISimulacaoAction = | IUpdateDFS | ISetPasso | ISetAlgoritmo;