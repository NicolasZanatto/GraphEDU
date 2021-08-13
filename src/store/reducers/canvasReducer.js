import data from "../../data/data.json";

const INICIAL_STATE = data;

export default function canvas(oldState = INICIAL_STATE, action) {
    if (action.type === "ADD_NODE") {
        console.log(oldState);
        let nodes = [...oldState.nodes];
        nodes.push(action.vertice)
        return { ...oldState, nodes };;
    }
    return oldState;
}
