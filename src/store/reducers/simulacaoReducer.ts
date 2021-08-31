import { ISimulacao, ISimulacaoAction } from "../types/simulacaoTypes";

const INICIAL_STATE: ISimulacao = {
    dfs: {
        caminho: [],
        passo: 0
    }
};


export default function simulacao(oldState = INICIAL_STATE, action: ISimulacaoAction) {
    let dfs = { ...oldState.dfs };

    switch (action.type) {
        case "UPDATE_DFS":
            dfs.caminho = action.payload.caminho
            return { ...oldState, dfs };

        case "SET_PASSO_DFS":
            dfs.passo = action.payload;
            return { ...oldState, dfs}
        default:
            return oldState;
    }
}