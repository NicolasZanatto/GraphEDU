import { EAlgoritmos } from "../../../../Algoritmos/EAlgoritmos";
import { AtualizarGrafoDFS } from "./atualizarGrafoDFS";
import { AtualizarGrafoBFS } from "./atualizarGrafoBFS";
import { AtualizarGrafoDIJKSTRA } from "./atualizarGrafoDIJKSTRA";
import { AtualizarGrafoBELLMANFORD } from "./atualizarGrafoBELLMANFORD";
import { AtualizarGrafoFLOYDWARSHALL } from "./atualizarGrafoFLOYDWARSHALL";

export const AtualizarCoresGrafo = (verticeInicial, verticeFinal, nodes, links, simulacao, styles) => {

    switch (simulacao.tipoAlgoritmo) {
        case EAlgoritmos.DFS:
            AtualizarGrafoDFS(verticeInicial, verticeFinal, nodes, links, simulacao, styles);
            break;
        case EAlgoritmos.BFS:
            AtualizarGrafoBFS(verticeInicial, verticeFinal, nodes, links, simulacao);
            break;
        case EAlgoritmos.DIJKSTRA:
            AtualizarGrafoDIJKSTRA(verticeInicial, verticeFinal, nodes, links, simulacao);
            break;
        case EAlgoritmos.BELLMANFORD:
            AtualizarGrafoBELLMANFORD(verticeInicial, verticeFinal, nodes, links, simulacao);
            break;
        case EAlgoritmos.FLOYDWARSHALL:
            AtualizarGrafoFLOYDWARSHALL(verticeInicial, verticeFinal, nodes, links, simulacao)
            break;
        default:
    }
}