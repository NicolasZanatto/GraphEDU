import data from "../../data/data.json";

const INICIAL_STATE = data;

export default function canvas(oldState = INICIAL_STATE, action) {
    switch (action.type) {
        case "ADD_NODE":
            console.log(oldState);
            let nodes = [...oldState.nodes];
            nodes.push(action.vertice)
            return { ...oldState, nodes };;

        case "OPTION_VALORADO":
            console.log("Valorado", action.payload);
            return { ...oldState, valorado: action.payload };;

        case "OPTION_DIRIGIDO":
            console.log("Dirigido", action.payload);
            return { ...oldState, dirigido: action.payload };;

        default:
            return oldState;
    }
}
