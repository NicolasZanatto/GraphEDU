import { beginDragLine, endDragLine } from "./desenharArestaEvent";


let singleClickTimer;
let numClicks = 0;

export const adicionarAresta = (aresta, arestas, addEdgeAction, dirigido, valorado) => {
    numClicks++;
    if (numClicks === 1) {
        singleClickTimer = setTimeout(() => {
            numClicks = 0;
            endDragLine(aresta, arestas, addEdgeAction, dirigido, valorado);
        }, 400);
    } else if (numClicks === 2) {
        clearTimeout(singleClickTimer);
        numClicks = 0;
        beginDragLine(aresta);
    }
}