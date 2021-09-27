import { EAlgoritmos } from "../../../../Algoritmos/EAlgoritmos";
import {AtualizarGrafoDFS}from "./atualizarGrafoDFS";
import {AtualizarGrafoBFS}from "./atualizarGrafoBFS";
import {AtualizarGrafoDIJKSTRA}from "./atualizarGrafoDIJKSTRA";

export const AtualizarCoresGrafo = (verticeInicial, verticeFinal, nodes, links, simulacao, styles) => {

    switch (simulacao.tipoAlgoritmo) {
        case EAlgoritmos.DFS:
            AtualizarGrafoDFS(verticeInicial, verticeFinal, nodes, links, simulacao,styles);
            break;
        case EAlgoritmos.BFS:
            AtualizarGrafoBFS(verticeInicial, verticeFinal, nodes, links, simulacao);
            break;
        case EAlgoritmos.DIJKSTRA:
            AtualizarGrafoDIJKSTRA(verticeInicial, verticeFinal, nodes, links, simulacao);
            break; 
        default:
    }
}