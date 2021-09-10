import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";

export interface IRetornoBFS {
    caminho: Array<ICaminhoBFS>
}

export interface ICaminhoBFS {
    verticeV?: number,
    verticeE?: number,
    linha: number,
    filaQ: Array<number>,
    listaAdj: Array<number>,
    listaVisitados: Array<IVisitadosBFS>
}

export interface IVisitadosBFS {
    idVertice: number;
    visitado: boolean;
}
