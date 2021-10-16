
import { IGrafo, ICanvasAction } from "../types/canvasTypes";




const INICIAL_STATE: IGrafo = {
    nodes: [],
    links: [],
    valorado: false,
    dirigido: false,
    verticeInicial: undefined,
    verticeFinal: undefined
};

export default function canvas(oldState = INICIAL_STATE, action: ICanvasAction) {
    let nodes = [...oldState.nodes];
    let links = [...oldState.links];
    switch (action.type) {
        case "ADD_NODE":
            nodes.push(action.payload)
            return { ...oldState, nodes };

        case "REMOVE_NODE":
            var indexOfNode = nodes.findIndex(i => i.id === action.payload.id);
            nodes.splice(indexOfNode, 1);
            return { ...oldState, nodes };

        case "SELECT_START_NODE":
            return { ...oldState, verticeInicial: action.payload }

        case "SELECT_FINAL_NODE":
            return { ...oldState, verticeFinal: action.payload }

        case "ADD_EDGE":
            links.push(action.payload)
            return { ...oldState, links };

        case "EDIT_EDGE":
            var objIndex = links.findIndex((i => i.id === action.payload.id));
            links[objIndex].value = action.payload.value;
            return { ...oldState, links };

        case "REMOVE_EDGE":
            var indiceRemover = links.findIndex((i => i.id === action.payload.id));
            links.splice(indiceRemover, 1);
            return { ...oldState, links };

        case "CHANGE_DIRECTION":
            var indiceTrocaDirecao = links.findIndex((i => i.id === action.payload.id));
            links[indiceTrocaDirecao].source = action.payload.source;
            links[indiceTrocaDirecao].target = action.payload.target;
            return { ...oldState, links };

        case "OPTION_VALORADO":
            return { ...oldState, valorado: action.payload };

        case "OPTION_DIRIGIDO":
            return { ...oldState, dirigido: action.payload };

        case "LIMPAR_GRAFO":
            return { ...oldState, nodes: [], links: [] }
        case "SETAR_GRAFO":
            return {
                ...oldState,
                nodes: action.payload.nodes,
                links: action.payload.links,
                dirigido: action.payload.dirigido,
                valorado: action.payload.valorado,
                verticeInicial: action.payload.verticeInicial,
                verticeFinal: action.payload.verticeFinal
            }
        case "RESTART_GRAFO":
            return { ...oldState, restartCanvas: action.payload }
        default:
            return oldState;
    }
}
