import {IGrafo} from "../store/types/canvasTypes";


class DFS {
    visitados = Array<boolean>();
    grafo : IGrafo;
    constructor(grafo : IGrafo) {
        this.grafo = grafo;
      }


    executar(){
        console.log(this.grafo);
    }
}

export default DFS;