import data from "../../data/data.json";

const INICIAL_STATE = data;

export default function canvas(oldState = INICIAL_STATE, action) {
    let nodes = [...oldState.nodes];
    let links = [...oldState.links];
    switch (action.type) {
        case "ADD_NODE":

            nodes.push(action.vertice)
            return { ...oldState, nodes };
        case "REMOVE_NODE":
            var indexOfNode = nodes.findIndex(i => i.id === action.payload.id);
            nodes.splice(indexOfNode, 1);
            return { ...oldState, nodes };
        case "ADD_EDGE":
            links.push(action.payload)
            return { ...oldState, links };
        case "EDIT_EDGE":
            var objIndex = links.findIndex((i => i.id === action.payload.id));
            links[objIndex].value = action.payload.value;
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
