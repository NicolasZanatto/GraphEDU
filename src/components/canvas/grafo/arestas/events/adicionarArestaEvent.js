import { eModoCriacao } from "../../../modo-criacao/eModoCriacao";
import { setarVerticeOrigemEvent, setarVerticeDestinoEvent } from "./desenharArestaEvent";
import * as d3 from "d3";


let verticeOrigemEscolhido, verticeDestinoEscolhido, singleClickTimer;

export const adicionarAresta = (vertice, arestas, addEdgeAction, dirigido, valorado, modoCriacao) => {
    console.log("modo criacao", modoCriacao)
    if(modoCriacao !== eModoCriacao.CriacaoAresta){
        verticeOrigemEscolhido = false;
        verticeDestinoEscolhido = false;
         return;
    }

    if (!verticeOrigemEscolhido) {
        setarVerticeOrigemEvent(vertice);
        verticeOrigemEscolhido = true;
        d3.select(`#vertice${vertice.id} .CircleCanvas`)
        .attr("stroke", vertice => {
            return "#32b31b";
        })
    } else if(!verticeDestinoEscolhido){
        setarVerticeDestinoEvent(vertice, arestas, addEdgeAction, dirigido, valorado);
        verticeOrigemEscolhido = false;
        verticeDestinoEscolhido = false;
        d3.select(`#vertice${vertice.id} .CircleCanvas`)
        .attr("stroke", vertice => {
            return "#f04d4d";
        })
    }

    singleClickTimer = setTimeout(() => {
        verticeOrigemEscolhido = false;
        verticeDestinoEscolhido = false;
    }, 1000);
    
    clearTimeout(singleClickTimer);
}

// export const adicionarAresta = (aresta, arestas, addEdgeAction, dirigido, valorado) => {
//     numClicks++;
//     if (numClicks === 1) {
//         singleClickTimer = setTimeout(() => {
//             numClicks = 0;
//             endDragLine(aresta, arestas, addEdgeAction, dirigido, valorado);
//         }, 400);
//     } else if (numClicks === 2) {
//         clearTimeout(singleClickTimer);
//         numClicks = 0;
//         beginDragLine(aresta);
//     }
// }