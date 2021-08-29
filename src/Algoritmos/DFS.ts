import { IGrafo, IAresta } from "../store/types/canvasTypes";

class Visitados {
    idVertice: number;
    visitado: boolean;
    constructor(idVertice: number, visitado: boolean) {
        this.idVertice = idVertice;
        this.visitado = visitado;
    }
}

class Retorno {
    verticeInicial: number;
    verticeFinal: number;

    constructor(verticeInicial: number, verticeFinal: number) {
        this.verticeInicial = verticeInicial;
        this.verticeFinal = verticeFinal;
    }
}


class DFS {
    visitados = new Array<Visitados>();
    s?: number;
    grafo: IGrafo;
    retorno = Array<Retorno>();
    adj = Array<IAresta>();

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    setVisitado(v: number) {
        this.visitados.filter(vertice => { return vertice.idVertice === v }).forEach(vertice => {
            vertice.visitado = true;
        });

        console.log("Vertice Visitado:", v);
    }

    dfs(s: number) {
        console.log("Visitados", this.visitados);
        this.setVisitado(s);

        this.adj = this.grafo.links.filter((aresta) => {
            return aresta.source.id === s || aresta.target.id === s
        });

        this.adj.forEach(aresta => {
            this.visitados.filter(vertice => {
                return (vertice.idVertice === aresta.target.id || vertice.idVertice === aresta.source.id) && !vertice.visitado
            })
                .forEach(vertice => {
                    this.dfs(vertice.idVertice);
                })
        })

    }

    main() {
        this.s = 1;

        this.grafo.nodes.forEach((vertice) => {
            this.visitados.push(new Visitados(vertice.id, false));
        })

        this.dfs(this.s);
        console.log(this.grafo);


    }

}

export default DFS;