import data from "../../data/data.json";

const INICIAL_STATE = data;

export default function canvas(oldState = INICIAL_STATE, action) {
    var nodes = [...oldState.nodes];
    switch (action.type) {
        case "ADD_NODE":

            nodes.push(action.vertice)
            return { ...oldState, nodes };
        case "REMOVE_NODE":
            var indexOfNode = nodes.findIndex(i => i.id === action.payload.id);
            nodes.splice(indexOfNode, 1);
            return { ...oldState, nodes };
        case "ADD_EDGE":
            let links = [...oldState.links];
            links.push(action.payload)
            return { ...oldState, links };
        case "OPTION_VALORADO":
            console.log("Valorado", action.payload);
            return { ...oldState, valorado: action.payload };

        case "OPTION_DIRIGIDO":
            console.log("Dirigido", action.payload);
            return { ...oldState, dirigido: action.payload };

        default:
            return oldState;
    }
}
