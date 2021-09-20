export interface IRetornoBFS {
    caminho: Array<ICaminhoDIJKSTRA>
}

export interface ICaminhoDIJKSTRA {
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
