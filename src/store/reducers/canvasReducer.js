import data from "../../data/data.json";

const INICIAL_STATE = {
    grafo: data
};

export default function canvas(state = INICIAL_STATE, action) {
    if (action === "ADD_NODE")
        return { ...state, grafo: state.grafo.push(action.vertice) }
    return state;
}
