import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IRetornoDFS, ICaminho, IVIsitadosDFS } from "../store/types/dfsTypes";
import { CaminhoVertice } from "./Common/CaminhoVertice";

class Retorno implements IRetornoDFS {
    caminho = new Array<Caminho>();

    adicionarPasso(
        linha: number, 
        listaVisitados: Array<IVIsitadosDFS>, 
        listaAdj: Array<number>, 
        caminhoVertice: Array<number>,
        caminhoAresta: Array<number>, 
        verticeS?: number, 
        verticeV?: number) {
        this.caminho.push(
            new Caminho(
                linha, 
                listaVisitados, 
                listaAdj, 
                caminhoVertice, 
                caminhoAresta,
                verticeS, 
                verticeV)
        );
    }
}

class Caminho implements ICaminho {
    verticeS?: number;
    verticeV?: number;
    linha: number;
    listaAdj = new Array<number>();
    listaVisitados = new Array<Visitados>();
    caminhoVertice = new Array<number>();
    caminhoAresta = new Array<number>();

    constructor(linha: number, listaVisitados: Array<Visitados>, listaAdj: Array<number>, caminhoVertice: Array<number>, caminhoAresta: Array<number>, verticeS?: number, verticeV?: number) {
        this.verticeS = verticeS;
        this.verticeV = verticeV;
        this.linha = linha;
        this.listaAdj = listaAdj;
        listaVisitados.forEach(val => this.listaVisitados.push(Object.assign({}, val)));
        this.caminhoVertice = caminhoVertice;
        caminhoAresta.forEach(val => this.caminhoAresta.push(val));
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
    grafo: IGrafo;
    retorno = new Retorno();
    visitados = new Array<Visitados>();
    adj = Array<IAresta>();
    caminhoVertice = new Array<CaminhoVertice>()
    caminhoAresta = new Array<number>()

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    adicionarPasso(linha: number, verticeS?: number, verticeV?: number) {
        this.retorno.adicionarPasso(
            linha, 
            this.visitados, 
            this.obterVerticesAdjacentes(this.adj, verticeS),
            this.caminhoVertice.find(x => x.vertice === verticeS)?.caminho?? [],
            this.caminhoAresta,
            verticeS, 
            verticeV);
    }

    adicionarCaminhoAresta(s: number, v: number){
        
        var idAresta = this.grafo.dirigido? 
                            this.grafo.links.filter(x => x.source.id === s && x.target.id === v)[0].id :
                            this.grafo.links.filter(x => (x.source.id === s && x.target.id === v) 
                                                    || (x.target.id === s && x.source.id === v))[0].id
        this.caminhoAresta.push(idAresta); 
    }

    obterCaminhoAteVerticeAtual(verticeS: number, verticeV: number){
        console.log("verticeS",verticeS);
        console.log("verticeV",verticeV);
        var caminho = new Array<number>();
        console.log("this.caminhoVertice",this.caminhoVertice);
        //Obtendo o caminho do vérticeS e inserindo na variável caminho;
        this.caminhoVertice.find(o => o.vertice === verticeS)?.caminho.forEach(val => caminho.push(val));
        caminho.push(verticeS);
        caminho.push(verticeV);
        // Setando novo caminho para o verticeV, obtendo caminho do verticeS + verticeS
        
        const elementsIndex = this.caminhoVertice.findIndex(element => element.vertice === verticeV )
        console.log("elementsIndex",elementsIndex);
        let copyCaminhoVertice = [...this.caminhoVertice];
        copyCaminhoVertice[elementsIndex].caminho =  caminho;

        console.log(`Caminho Vértice ${verticeS}:`, caminho);
    }

    adicionarCaminhoVerticeInicial(verticeInicial : number){
        const elementsIndex = this.caminhoVertice.findIndex(element => element.vertice === verticeInicial )
        console.log("elementsIndex",elementsIndex);
        let copyCaminhoVertice = [...this.caminhoVertice];
        copyCaminhoVertice[elementsIndex].caminho =  [verticeInicial];
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

    obterVerticesAdjacentes(listaAdj: Array<IAresta>, verticeInicial?: number) {
        if(verticeInicial === undefined) return [];
        var verticesAdjacentesOrigem = listaAdj.map(x => x.source.id).filter(x => { return x !== verticeInicial });
        var verticesAdjacentesDestino = listaAdj.map(x => x.target.id).filter(x => { return x !== verticeInicial });
        return verticesAdjacentesOrigem.concat(verticesAdjacentesDestino);
    }

    dfs(s: number) {
        this.adj = this.obtemListaAdjacencias(s);
        this.adicionarPasso(1, s, undefined);
        this.adicionarPasso(2, s, undefined);
        this.setVisitado(s);
        this.adicionarPasso(3, s, undefined);
        this.adj.forEach(aresta => {
            this.obtemVerticesNaoVisitados(aresta)
                .forEach(vertice => {
                    this.obterCaminhoAteVerticeAtual(s, vertice.idVertice);
                    this.adicionarPasso(4, s, vertice.idVertice);
                    this.adicionarPasso(5, s, vertice.idVertice);
                    this.adicionarCaminhoAresta(s, vertice.idVertice)
                    this.dfs(vertice.idVertice);
                    this.adj = this.obtemListaAdjacencias(s);
                    this.adicionarPasso(3, s, undefined);

                })
        })
    }

    main() {

        this.adicionarPasso(7, undefined, undefined);

        this.grafo.nodes.forEach((vertice) => {
            this.adicionarPasso(8, undefined, undefined);
            this.visitados.push(new Visitados(vertice.id, false));
            this.caminhoVertice.push(new CaminhoVertice(vertice.id, []))
            this.adicionarPasso(9, undefined, vertice.id);
        });
        this.adicionarPasso(10, this.grafo.verticeInicial ?? 1, undefined);
        this.adicionarCaminhoVerticeInicial(this.grafo.verticeInicial ?? 1)
        this.dfs(this.grafo.verticeInicial ?? 1);
        
        return this.retorno;
    }

}

export default DFS;