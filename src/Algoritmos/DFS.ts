import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IRetornoDFS, ICaminho } from "../store/types/simulacaoTypes";


class Retorno implements IRetornoDFS {
    caminho = new Array<Caminho>();
    passo = 0;

    adicionarPasso(verticeInicial: number, verticeFinal: number) {
        this.caminho.push(new Caminho(verticeInicial, verticeFinal));
    }
}

class Caminho implements ICaminho {
    verticeInicial: number;
    verticeFinal: number;

    constructor(verticeInicial: number, verticeFinal: number) {
        this.verticeInicial = verticeInicial;
        this.verticeFinal = verticeFinal;
    }
}

class Visitados {
    idVertice: number;
    visitado: boolean;
    constructor(idVertice: number, visitado: boolean) {
        this.idVertice = idVertice;
        this.visitado = visitado;
    }
}


class DFS {
    visitados = new Array<Visitados>();
    s?: number;
    grafo: IGrafo;
    retorno = new Retorno();
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

    obtemListaAdjacencias(s: number){
        return this.grafo.links.filter((aresta) => {
            return aresta.source.id === s || aresta.target.id === s
        });
    }

    obtemVerticesNaoVisitados(aresta : IAresta){
        return this.visitados.filter(vertice => {
            return (vertice.idVertice === aresta.target.id || vertice.idVertice === aresta.source.id) && !vertice.visitado
        })
    }

    dfs(s: number) {
        console.log("Visitados", this.visitados);
        this.setVisitado(s);

        this.adj = this.obtemListaAdjacencias(s);

        this.adj.forEach(aresta => {
            this.obtemVerticesNaoVisitados(aresta)
                .forEach(vertice => {
                    this.retorno.adicionarPasso(s, vertice.idVertice);
                    this.dfs(vertice.idVertice);
                })
        })

    }

    main() {
        this.grafo.nodes.forEach((vertice) => {
            this.visitados.push(new Visitados(vertice.id, false));
        })

        this.dfs(this.grafo.verticeInicial ?? 1);
        console.log(this.grafo);

        return this.retorno;
    }

}

export default DFS;