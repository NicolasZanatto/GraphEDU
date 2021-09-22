export interface IRetornoDIJKSTRA {
    caminho: Array<ICaminhoDIJKSTRA>
}

export interface ICaminhoDIJKSTRA {
    verticeV?: number,
    verticeE?: number,
    linha: number,
    filaQ: Array<number>,
    listaAdj: Array<number>,
    listaDistancia: Array<IDistancia>
}

export interface IDistancia {
    idVertice: number;
    peso?: number;
    infinito: boolean;
}

export interface IDistanciaNaoInfinitas {
    idVertice: number;
    peso: number;
}