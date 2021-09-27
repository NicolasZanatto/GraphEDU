export interface IRetornoDIJKSTRA {
    caminho: Array<ICaminhoDIJKSTRA>
}

export interface ICaminhoDIJKSTRA {
    verticeS?: number,
    verticeU?: number,
    verticeV?: number,
    distanciaU?: number;
    distanciaV?: number;
    arestaE?: number,
    linha: number,
    conjuntoQ: Array<number>,
    listaAdj: Array<number>,
    listaDistancia: Array<IDistancia>
}

export interface IDistancia {
    idVertice: number;
    peso?: number;
    infinito: boolean;
    verticePai: number;
}

export interface IDistanciaNaoInfinitas {
    idVertice: number;
    peso: number;
}