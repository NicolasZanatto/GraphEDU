export interface IRetornoFLOYDWARSHALL {
    caminho: Array<ICaminhoFLOYDWARSHALL>
}

export interface ICaminhoFLOYDWARSHALL {
    linha: number,
    verticeI?: number,
    verticeJ?: number,
    verticeK?: number,
    distanciaIJ?: number,
    distanciaIK?: number,
    distanciaKJ?: number,
    matrizDistancia: IDistancia[][]
}

export interface IDistancia {
    peso?: number;
    infinito: boolean;
    verticePai?: number;
}

