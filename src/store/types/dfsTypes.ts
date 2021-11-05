import { EAlgoritmos } from "../../Algoritmos/EAlgoritmos";

export interface ISimulacao {
    dfs: IRetornoDFS,
    passo: number,
    tipoAlgoritmo?: EAlgoritmos
}

export interface IRetornoDFS {
    caminho: Array<ICaminho>
}

export interface ICaminho {
    verticeS?: number,
    verticeV?: number,
    linha: number,
    listaAdj: Array<number>
    listaVisitados: Array<IVIsitadosDFS>
    caminhoVertice : Array<number>
    caminhoAresta : Array<number>
}

export interface IVIsitadosDFS {
    idVertice: number;
    visitado: boolean;
}
