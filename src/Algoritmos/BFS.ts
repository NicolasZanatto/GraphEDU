import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IVIsitadosDFS } from "../store/types/simulacaoTypes";

class Visitados implements IVIsitadosDFS {
    idVertice: number;
    visitado: boolean;
    constructor(idVertice: number, visitado: boolean) {
        this.idVertice = idVertice;
        this.visitado = visitado;
    }
}

class BFS {
    grafo: IGrafo;
    visitados = new Array<Visitados>();

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    setVisitado(v: number) {
        this.visitados.filter(vertice => { return vertice.idVertice === v }).forEach(vertice => {
            console.log("Vértice Visitado:", vertice.idVertice);
            vertice.visitado = true;
        });

    }

    foiVisitado(v: number) {
        return this.visitados.some(vertice => {
            return (vertice.idVertice === v || vertice.idVertice === v) && !vertice.visitado
        })
    }

    obterVerticeDestino(v: number | undefined, aresta: IAresta) {
        return aresta.source.id === v ? aresta.target.id : aresta.source.id;
    }

    obtemListaAdjacencias(s: number | undefined) {
        return this.grafo.links.filter((aresta) => {
            return this.grafo.dirigido ? (aresta.source.id === s) : (aresta.source.id === s || aresta.target.id === s)
        });
    }

    bfs(s: number) {
        var Q = new Array<number>();
        this.setVisitado(s);

        Q.push(s);

        while (Q.length > 0) {
            let v = Q.shift();
            var listaAdj = this.obtemListaAdjacencias(v);

            listaAdj.forEach((e) => {
                var verticeDestino = this.obterVerticeDestino(v, e)
                if (this.foiVisitado(verticeDestino)) {
                    Q.push(verticeDestino)
                    this.setVisitado(verticeDestino);
                }
            })
        }
    }

    main() {
        this.grafo.nodes.forEach((vertice) => {
            this.visitados.push(new Visitados(vertice.id, false));
        });

        this.bfs(this.grafo.verticeInicial ?? 1);
    }

}

export default BFS;