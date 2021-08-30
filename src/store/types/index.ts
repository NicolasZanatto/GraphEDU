import { IGrafo } from "./canvasTypes"
import { ISimulacao } from "./simulacaoTypes"

export interface IState {
    canvas: IGrafo,
    simulacao: ISimulacao
};