import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IRetornoDFS, ICaminho } from "../store/types/simulacaoTypes";


class Retorno implements IRetornoDFS {
    caminho = new Array<Caminho>();

    adicionarPasso(linha: number, listaAdj: Array<number>, verticeInicial?: number, verticeFinal?: number) {
        this.caminho.push(new Caminho(linha, listaAdj, verticeInicial, verticeFinal));
    }
}

class Caminho implements ICaminho {
    verticeInicial?: number;
    verticeFinal?: number;
    linha: number;
    listaAdj = new Array<number>()

    constructor(linha: number, listaAdj: Array<number>, verticeInicial?: number, verticeFinal?: number) {
        this.verticeInicial = verticeInicial;
        this.verticeFinal = verticeFinal;
        this.linha = linha;
        this.listaAdj = listaAdj;
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

    }

    obtemListaAdjacencias(s: number) {
        return this.grafo.links.filter((aresta) => {
            return aresta.source.id === s || aresta.target.id === s
        });
    }

    obtemVerticesNaoVisitados(aresta: IAresta) {
        return this.visitados.filter(vertice => {
            return (vertice.idVertice === aresta.target.id || vertice.idVertice === aresta.source.id) && !vertice.visitado
        })
    }

    obterVerticesAdjacentes(verticeInicial: number) {
        var verticesAdjacentesOrigem = this.adj.map(x => x.source.id).filter(x => { return x !== verticeInicial });
        var verticesAdjacentesDestino = this.adj.map(x => x.target.id).filter(x => { return x !== verticeInicial });
        return verticesAdjacentesOrigem.concat(verticesAdjacentesDestino);
    }

    dfs(s: number) {
        this.setVisitado(s);
        this.retorno.adicionarPasso(2, [], s, undefined);
        this.adj = this.obtemListaAdjacencias(s);

        this.retorno.adicionarPasso(3, this.obterVerticesAdjacentes(s), s, undefined);
        this.adj.forEach(aresta => {
            this.obtemVerticesNaoVisitados(aresta)
                .forEach(vertice => {
                    this.retorno.adicionarPasso(4, [], s, vertice.idVertice);
                    this.retorno.adicionarPasso(5, [], vertice.idVertice, undefined);
                    this.dfs(vertice.idVertice);
                    this.retorno.adicionarPasso(3, this.obterVerticesAdjacentes(s), s, undefined);

                })
        })

    }

    main() {

        this.retorno.adicionarPasso(7, [], undefined, undefined);

        this.grafo.nodes.forEach((vertice) => {
            this.retorno.adicionarPasso(8, [], undefined, undefined);
            this.visitados.push(new Visitados(vertice.id, false));
            this.retorno.adicionarPasso(9, [], vertice.id, undefined);
        });

        this.retorno.adicionarPasso(10, [], this.grafo.verticeInicial ?? 1, undefined);
        this.dfs(this.grafo.verticeInicial ?? 1);

        return this.retorno;
    }

}

export default DFS;