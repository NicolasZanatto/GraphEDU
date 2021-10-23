import { IAresta } from "./canvasTypes";

export interface IRetornoPRIM {
    caminho: Array<ICaminhoPRIM>
}

export interface ICaminhoPRIM {
    linha: number,
    verticeU?: number,
    verticeV?: number,
    distanciaU?: number;
    distanciaV?: number;
    arestaE?: number,
    conjuntoU: Array<number>,
    listaAdj: Array<number>,
    listaDistancia: Array<IDistancia>,
    caminhoArestas: Array<number>
}

export interface IDistancia {
    idVertice: number;
    peso?: number;
    infinito: boolean;
    verticePai: number;
}