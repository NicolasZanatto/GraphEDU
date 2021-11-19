import { EAlgoritmos } from "../../../../Algoritmos/EAlgoritmos";
import { AtualizarGrafoDFS } from "./atualizarGrafoDFS";
import { AtualizarGrafoBFS } from "./atualizarGrafoBFS";
import { AtualizarGrafoDIJKSTRA } from "./atualizarGrafoDIJKSTRA";
import { AtualizarGrafoBELLMANFORD } from "./atualizarGrafoBELLMANFORD";
import { AtualizarGrafoFLOYDWARSHALL } from "./atualizarGrafoFLOYDWARSHALL";
import { AtualizarGrafoPRIM } from "./atualizarGrafoPRIM";
import {AtualizarGrafoKRUSKAL} from "./atualizarGrafoKRUSKAL";
import { adicionarArestaReset } from "../arestas/events/adicionarArestaPesoEvent";
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
        case EAlgoritmos.PRIM:
            AtualizarGrafoPRIM(verticeInicial, verticeFinal, nodes, links, simulacao)
            break;
        case EAlgoritmos.KRUSKAL:
            AtualizarGrafoKRUSKAL(verticeInicial, verticeFinal, nodes, links, simulacao)
            break;
        default:
    }
}

export const AtualizarVerticesEArestasGrafo = (oldNodes, oldLinks, newNodes, newLinks) => {
    oldNodes.splice(0, oldNodes.length);
    newNodes.forEach(node => oldNodes.push(node));
    oldLinks.splice(0, oldLinks.length);
    newLinks.forEach(link => adicionarArestaReset(oldLinks, newNodes.find(o => o.id === link.source.id), newNodes.find(o => o.id === link.target.id), link.id, link.value))
}