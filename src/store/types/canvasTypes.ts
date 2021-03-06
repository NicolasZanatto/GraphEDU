
import { Action } from "redux";
import { eModoCriacao } from "../../components/canvas/modo-criacao/eModoCriacao";


export interface IVertice {
    id: number,
    x: number,
    y: number,
    fx: number,
    fy: number
    vx: number,
    vy: number
};

export interface IAresta {
    id: number,
    source: IVertice,
    target: IVertice,
    value: number
};

export interface IGrafo {
    nodes: Array<IVertice>,
    links: Array<IAresta>,
    valorado: Boolean,
    dirigido: Boolean
    verticeInicial?: number,
    verticeFinal?: number,
    modoCriacao?: eModoCriacao
};

export interface ICaminhoVertice {
    vertice: number,
    caminho: Array<number>
}

export interface IAddNode extends Action {
    type: "ADD_NODE",
    payload: IVertice
};

export interface IRemoveNode extends Action {
    type: "REMOVE_NODE",
    payload: IVertice
};

export interface IStartNode extends Action {
    type: "SELECT_START_NODE",
    payload: number
}

export interface IFinalNode extends Action {
    type: "SELECT_FINAL_NODE",
    payload: number
}

export interface IAddEdge extends Action {
    type: "ADD_EDGE",
    payload: IAresta
};

export interface IEditEdge extends Action {
    type: "EDIT_EDGE",
    payload: IAresta
};

export interface IRemoveEdge extends Action {
    type: "REMOVE_EDGE",
    payload: IAresta
};

export interface IChangeDirection extends Action {
    type: "CHANGE_DIRECTION",
    payload: IAresta
};

export interface IOptionValorado extends Action {
    type: "OPTION_VALORADO",
    payload: Boolean
};

export interface IOptionDirigido extends Action {
    type: "OPTION_DIRIGIDO",
    payload: Boolean
};

export interface ILimparGrafo extends Action {
    type: "LIMPAR_GRAFO"
};
export interface ISetarGrafo extends Action {
    type: "SETAR_GRAFO",
    payload: IGrafo
};
export interface IRestartGrafo extends Action {
    type: "RESTART_GRAFO",
    payload: boolean
};

export interface ISetModoCriacaoGrafo extends Action {
    type: "SET_MODO_CRIACAO_GRAFO",
    payload: eModoCriacao
}

export type ICanvasAction = | IAddNode | IStartNode | IFinalNode | IRemoveNode | IAddEdge | IEditEdge | IRemoveEdge | IChangeDirection | IOptionValorado | IOptionDirigido | ILimparGrafo | ISetarGrafo | IRestartGrafo | ISetModoCriacaoGrafo;