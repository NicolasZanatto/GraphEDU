export interface IRetornoBFS {
    caminho: Array<ICaminhoBFS>
}

export interface ICaminhoBFS {
    verticeV?: number,
    verticeE?: number,
    linha: number,
    filaQ: Array<number>,
    listaAdj: Array<number>,
    listaVisitados: Array<IVisitadosBFS>,
    caminhoAresta: Array<number>
}

export interface IVisitadosBFS {
    idVertice: number;
    visitado: boolean;
}
