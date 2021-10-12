export interface IRetornoBELLMANFORD {
    caminho: Array<ICaminhoBELLMANNFORD>
}

export interface ICaminhoBELLMANNFORD {
    verticeS?: number,
    verticeU?: number,
    verticeV?: number,
    distanciaU?: number;
    distanciaV?: number;
    arestaE?: number,
    linha: number,
    conjuntoQ: Array<number>,
    listaAdj: Array<number>,
    listaDistancia: Array<IDistancia>,
    tempDistancia?: number
}

export interface IDistancia {
    peso?: number;
    infinito: boolean;
}

export interface IDistanciaNaoInfinitas {
    idVertice: number;
    peso: number;
}