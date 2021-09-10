import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IVisitadosBFS, IRetornoBFS, ICaminhoBFS } from "../store/types/bfsTypes";

class Retorno implements IRetornoBFS {
    caminho = new Array<Caminho>();

    adicionarPasso(linha: number, listaVisitados: Array<IVisitadosBFS>, filaQ: Array<number>, listaAdj: Array<number>, verticeV?: number, verticeE?: number) {
        this.caminho.push(new Caminho(linha, listaVisitados, filaQ, listaAdj, verticeV, verticeE));
    }
}

class Visitados implements IVisitadosBFS {
    idVertice: number;
    visitado: boolean;
    constructor(idVertice: number, visitado: boolean) {
        this.idVertice = idVertice;
        this.visitado = visitado;
    }
}

class Caminho implements ICaminhoBFS {
    linha: number;
    verticeV?: number;
    verticeE?: number;
    filaQ = new Array<number>();
    listaAdj = new Array<number>();
    listaVisitados = new Array<Visitados>();

    constructor(linha: number, listaVisitados: Array<Visitados>, filaQ: Array<number>, listaAdj: Array<number>, verticeV?: number, verticeE?: number) {
        this.verticeV = verticeV;
        this.verticeE = verticeE;
        this.linha = linha;
        filaQ.forEach(val => this.filaQ.push(val));
        listaAdj.forEach(val => this.listaAdj.push(val));
        listaVisitados.forEach(val => this.listaVisitados.push(Object.assign({}, val)));
    }
}



class BFS {
    grafo: IGrafo;
    visitados = new Array<Visitados>();
    retorno = new Retorno();
    Q = new Array<number>();
    listaAdj = new Array<IAresta>();

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    adicionarPasso(linha: number, verticeV?: number, verticeE?: number) {
        this.retorno.adicionarPasso(linha, this.visitados, this.Q, this.listaAdj.map(o => { return this.obterVerticeDestino(verticeV, o) }), verticeV, verticeE)
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
        this.adicionarPasso(1);
        this.adicionarPasso(2);
        this.adicionarPasso(3);
        this.setVisitado(s);
        this.adicionarPasso(4);
        this.Q.push(s);
        this.adicionarPasso(5);
        while (this.Q.length > 0) {
            this.adicionarPasso(6);
            let v = this.Q.shift();
            this.adicionarPasso(7, v);
            this.listaAdj = this.obtemListaAdjacencias(v);
            this.listaAdj.forEach((e) => {
                var verticeDestino = this.obterVerticeDestino(v, e)
                this.adicionarPasso(8, v, verticeDestino);
                if (this.foiVisitado(verticeDestino)) {
                    this.Q.push(verticeDestino)
                    this.adicionarPasso(9, v, verticeDestino);
                    this.setVisitado(verticeDestino);
                    this.adicionarPasso(10, v, verticeDestino);
                }
                this.adicionarPasso(11, v, verticeDestino);
            })
            this.adicionarPasso(12, v);
            this.listaAdj = [];
        }
        this.adicionarPasso(13);
        this.adicionarPasso(14);
    }

    main() {
        this.adicionarPasso(15);
        this.grafo.nodes.forEach((vertice) => {
            this.adicionarPasso(16, vertice.id);
            this.visitados.push(new Visitados(vertice.id, false));
            this.adicionarPasso(17, vertice.id);
        });
        this.adicionarPasso(19);
        this.adicionarPasso(20);
        this.bfs(this.grafo.verticeInicial ?? 1);
        this.adicionarPasso(21);
        return this.retorno;
    }

}

export default BFS;