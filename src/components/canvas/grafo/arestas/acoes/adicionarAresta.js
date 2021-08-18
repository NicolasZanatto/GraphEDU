import { beginDragLine, endDragLine } from "../../arestas/events/desenharArestaEvent";


let singleClickTimer;
let numClicks = 0;

export const adicionarAresta = (aresta, arestas, addEdgeAction) => {
    numClicks++;
    if (numClicks === 1) {
        singleClickTimer = setTimeout(() => {
            numClicks = 0;
            endDragLine(aresta, arestas, addEdgeAction);
        }, 400);
    } else if (numClicks === 2) {
        clearTimeout(singleClickTimer);
        numClicks = 0;
        beginDragLine(aresta);
    }
}