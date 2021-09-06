import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IRetornoDFS, ICaminho, IVIsitadosDFS } from "../store/types/simulacaoTypes";


class Retorno implements IRetornoDFS {
    caminho = new Array<Caminho>();

    adicionarPasso(linha: number, listaVisitados: Array<IVIsitadosDFS>, listaAdj: Array<number>, verticeS?: number, verticeV?: number) {
        this.caminho.push(new Caminho(linha, listaVisitados, listaAdj, verticeS, verticeV));
    }
}

class Caminho implements ICaminho {
    verticeS?: number;
    verticeV?: number;
    linha: number;
    listaAdj = new Array<number>();
    listaVisitados = new Array<Visitados>();

    constructor(linha: number, listaVisitados: Array<Visitados>, listaAdj: Array<number>, verticeS?: number, verticeV?: number) {
        this.verticeS = verticeS;
        this.verticeV = verticeV;
        this.linha = linha;
        this.listaAdj = listaAdj;
        listaVisitados.forEach(val => this.listaVisitados.push(Object.assign({}, val)));
    }
}

class Visitados implements IVIsitadosDFS {
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
            return this.grafo.dirigido ? (aresta.source.id === s) : (aresta.source.id === s || aresta.target.id === s)
        });
    }

    obtemVerticesNaoVisitados(aresta: IAresta) {
        return this.visitados.filter(vertice => {
            return (vertice.idVertice === aresta.target.id || vertice.idVertice === aresta.source.id) && !vertice.visitado
        })
    }

    obterVerticesAdjacentes(listaAdj: Array<IAresta>, verticeInicial: number) {
        var verticesAdjacentesOrigem = listaAdj.map(x => x.source.id).filter(x => { return x !== verticeInicial });
        var verticesAdjacentesDestino = listaAdj.map(x => x.target.id).filter(x => { return x !== verticeInicial });
        return verticesAdjacentesOrigem.concat(verticesAdjacentesDestino);
    }

    dfs(s: number) {
        this.retorno.adicionarPasso(2, this.visitados, [], s, undefined);
        this.setVisitado(s);
        this.adj = this.obtemListaAdjacencias(s);
        var listaAdj = this.adj;
        this.retorno.adicionarPasso(3, this.visitados, this.obterVerticesAdjacentes(listaAdj, s), s, undefined);
        this.adj.forEach(aresta => {
            this.obtemVerticesNaoVisitados(aresta)
                .forEach(vertice => {
                    this.retorno.adicionarPasso(4, this.visitados, [], s, vertice.idVertice);
                    this.retorno.adicionarPasso(5, this.visitados, [], s, vertice.idVertice);
                    this.dfs(vertice.idVertice);
                    this.retorno.adicionarPasso(3, this.visitados, this.obterVerticesAdjacentes(listaAdj, s), s, undefined);

                })
        })

    }

    main() {

        this.retorno.adicionarPasso(7, this.visitados, [], undefined, undefined);

        this.grafo.nodes.forEach((vertice) => {
            this.retorno.adicionarPasso(8, this.visitados, [], undefined, undefined);
            this.visitados.push(new Visitados(vertice.id, false));
            this.retorno.adicionarPasso(9, this.visitados, [], undefined, vertice.id);
        });

        this.retorno.adicionarPasso(10, this.visitados, [], this.grafo.verticeInicial ?? 1, undefined);
        this.dfs(this.grafo.verticeInicial ?? 1);

        return this.retorno;
    }

}

export default DFS;