import { Action } from "redux";
import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";
import { IRetornoDFS } from "./dfsTypes";
import { IRetornoBFS } from "./bfsTypes";
import { IRetornoDIJKSTRA } from "./dijkstraTypes";
import { IRetornoBELLMANFORD } from "./bellmanFordTypes";

export interface ISimulacao {
    dfs: IRetornoDFS,
    bfs: IRetornoBFS,
    dijkstra: IRetornoDIJKSTRA,
    bellmanford: IRetornoBELLMANFORD,
    passo: number,
    qntdPassos: number,
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

export interface IUpdateDIJKSTRA extends Action {
    type: "UPDATE_DIJKSTRA",
    payload: IRetornoDIJKSTRA
};

export interface IUpdateBELLMANFORD extends Action {
    type: "UPDATE_BELLMANFORD",
    payload: IRetornoBELLMANFORD
};

export interface ISetPasso extends Action {
    type: "SET_PASSO",
    payload: number
};

export interface ISetQntdPassos extends Action {
    type: "SET_QNTD_PASSOS",
    payload: number
};

export interface ISetAlgoritmo extends Action {
    type: "SET_ALGORITMO",
    payload: EAlgoritmos
}

export type ISimulacaoAction = | IUpdateDFS | IUpdateBFS  | IUpdateDIJKSTRA | IUpdateBELLMANFORD | ISetPasso | ISetQntdPassos | ISetAlgoritmo;