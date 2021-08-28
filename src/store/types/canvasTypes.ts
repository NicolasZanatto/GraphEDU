
import {Action} from "redux";


export interface IVertice {
    id: Number,
    x: Number,
    y: Number,
    fx: Number,
    fy: Number
    vx: Number,
    vy: Number
};

export interface IAresta {
    id: Number,
    source: IVertice,
    target: IVertice,
    value: Number
};

export interface IGrafo {
    nodes: Array<IVertice>,
    links: Array<IAresta>,
    valorado: Boolean,
    dirigido: Boolean
};

export interface ICanvas {
    canvas: IGrafo
};

export interface IAddNode extends Action{
    type: "ADD_NODE",
    payload: IVertice
};

export interface IRemoveNode extends Action{
    type: "REMOVE_NODE",
    payload: IVertice
};

export interface IAddEdge extends Action{
    type: "ADD_EDGE",
    payload: IAresta
};

export interface IEditEdge extends Action{
    type: "EDIT_EDGE",
    payload: IAresta
};

export interface IRemoveEdge extends Action{
    type: "REMOVE_EDGE",
    payload: IAresta
};

export interface IChangeDirection extends Action{
    type: "CHANGE_DIRECTION",
    payload: IAresta
};

export interface IOptionValorado extends Action{
    type: "OPTION_VALORADO",
    payload: Boolean
};

export interface IOptionDirigido extends Action{
    type: "OPTION_DIRIGIDO",
    payload: Boolean
};

export type ICanvasAction = | IAddNode | IRemoveNode | IAddEdge | IEditEdge | IRemoveEdge | IChangeDirection | IOptionValorado | IOptionDirigido;