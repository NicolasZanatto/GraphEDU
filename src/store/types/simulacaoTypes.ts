import { Action } from "redux";
import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";
import { IRetornoDFS } from "./dfsTypes";
import { IRetornoBFS } from "./bfsTypes";

export interface ISimulacao {
    dfs: IRetornoDFS,
    bfs: IRetornoBFS,
    passo: number,
    tipoAlgoritmo?: EAlgoritmos
}

export interface IUpdateDFS extends Action {
    type: "UPDATE_DFS",
    payload: IRetornoDFS
};

export interface IUpdateBFS extends Action {
    type: "UPDATE_BFS",
    payload: IRetornoBFS
};

export interface ISetPasso extends Action {
    type: "SET_PASSO",
    payload: number
};

export interface ISetAlgoritmo extends Action {
    type: "SET_ALGORITMO",
    payload: EAlgoritmos
}

export type ISimulacaoAction = | IUpdateDFS | IUpdateBFS | ISetPasso | ISetAlgoritmo;