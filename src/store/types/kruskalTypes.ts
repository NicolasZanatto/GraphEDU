import { IAresta } from "./canvasTypes";

export interface IRetornoKRUSKAL {
    caminho: Array<ICaminhoKRUSKAL>
}

export interface ICaminhoKRUSKAL {
    linha: number,
    arestaE?: IAresta,
    arrayPai: Array<IPai>,
    caminhoArestas: Array<number>
}

export interface IPai {
    idVertice: number;
    verticePai: number;
}