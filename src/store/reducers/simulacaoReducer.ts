import { ISimulacao, ISimulacaoAction } from "../types/simulacaoTypes";

const INICIAL_STATE: ISimulacao = {
    dfs: {
        caminho: []
    },
    passo: 0,
    tipoAlgoritmo: undefined
};


export default function simulacao(oldState = INICIAL_STATE, action: ISimulacaoAction) {
    let dfs = { ...oldState.dfs };

    switch (action.type) {
        case "UPDATE_DFS":
            dfs.caminho = action.payload.caminho
            return { ...oldState, dfs };

        case "SET_PASSO":
            return { ...oldState, passo: action.payload }
        case "SET_ALGORITMO":
            console.log("SET_ALGORITMO", action.payload);
            return { ...oldState, tipoAlgoritmo: action.payload }
        default:
            return oldState;
    }
}