import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IVisitadosBFS, IRetornoBFS, ICaminhoBFS } from "../store/types/bfsTypes";
import { CaminhoVertice } from "./Common/CaminhoVertice";

class Retorno implements IRetornoBFS {
    caminho = new Array<Caminho>();

    adicionarPasso(
        linha: number, 
        listaVisitados: Array<IVisitadosBFS>, 
        filaQ: Array<number>, 
        listaAdj: Array<number>, 
        caminhoVertice: Array<number>, 
        caminhoAresta: Array<number>, 
        verticeV?: number, 
        verticeE?: number) {
        this.caminho.push(
            new Caminho(linha, listaVisitados, filaQ, listaAdj, caminhoVertice,caminhoAresta, verticeV, verticeE));
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
    caminhoVertice = new Array<number>();
    caminhoAresta = new Array<number>();

    constructor(linha: number, listaVisitados: Array<Visitados>, filaQ: Array<number>, listaAdj: Array<number>, caminhoVertice: Array<number>,caminhoAresta: Array<number>, verticeV?: number, verticeE?: number) {
        this.verticeV = verticeV;
        this.verticeE = verticeE;
        this.linha = linha;
        filaQ.forEach(val => this.filaQ.push(val));
        listaAdj.forEach(val => this.listaAdj.push(val));
        listaVisitados.forEach(val => this.listaVisitados.push(Object.assign({}, val)));
        this.caminhoVertice = caminhoVertice;
        caminhoAresta.forEach(val => this.caminhoAresta.push(val));
    }
}



class BFS {
    grafo: IGrafo;
    visitados = new Array<Visitados>();
    retorno = new Retorno();
    Q = new Array<number>();
    listaAdj = new Array<IAresta>();
    caminhoVertice = new Array<CaminhoVertice>()
    caminhoAresta = new Array<number>()

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    adicionarPasso(linha: number, verticeV?: number, verticeE?: number, verticeS?: number) {
        this.retorno.adicionarPasso(
            linha, 
            this.visitados, 
            this.Q, 
            this.listaAdj.map(o => { return this.obterVerticeDestino(verticeV, o) }), 
            this.caminhoVertice.find(x => x.vertice === verticeS || (verticeE === undefined? x.vertice === verticeV : x.vertice === verticeE))?.caminho?? [],
            this.caminhoAresta,
            verticeV, 
            verticeE)
    }
    adicionarCaminhoAresta(origem?: number, destino?: number){
        var idAresta = this.grafo.dirigido? 
                            this.grafo.links.filter(x => x.source.id === origem && x.target.id === destino)[0].id :
                            this.grafo.links.filter(x => (x.source.id === origem && x.target.id === destino) 
                                                    || (x.target.id === origem && x.source.id === destino))[0].id
        this.caminhoAresta.push(idAresta); 
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

    obterCaminhoAteVerticeAtual(verticeV?: number, verticeE?: number){
        console.log("verticeV",verticeV);
        console.log("verticeE",verticeE);
        var caminho = new Array<number>();
        console.log("this.caminhoVertice",this.caminhoVertice);
        //Obtendo o caminho do vérticeS e inserindo na variável caminho;
        this.caminhoVertice.find(o => o.vertice === verticeV)?.caminho.forEach(val => caminho.push(val));
    
        if(verticeE !== undefined)
            caminho.push(verticeE);
        // Setando novo caminho para o verticeE, obtendo caminho do verticeV + verticeE
        
        const elementsIndex = this.caminhoVertice.findIndex(element => element.vertice === verticeE )
        console.log("elementsIndex",elementsIndex);
        let copyCaminhoVertice = [...this.caminhoVertice];
        copyCaminhoVertice[elementsIndex].caminho =  caminho;

        console.log(`Caminho Vértice ${verticeV}:`, caminho);
    }

    adicionarCaminhoVerticeInicial(verticeInicial : number){
        const elementsIndex = this.caminhoVertice.findIndex(element => element.vertice === verticeInicial )
        console.log("elementsIndex",elementsIndex);
        let copyCaminhoVertice = [...this.caminhoVertice];
        copyCaminhoVertice[elementsIndex].caminho =  [verticeInicial];
        console.log("Caminho:", this.caminhoVertice);
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
        this.adicionarCaminhoVerticeInicial(s);
        this.adicionarPasso(4,undefined,undefined,s);
        this.Q.push(s);
        this.adicionarPasso(5,undefined,undefined,s);
        while (this.Q.length > 0) {
            this.adicionarPasso(6,undefined,undefined,s);
            let v = this.Q.shift();
            this.adicionarPasso(7, v,undefined,s);
            this.listaAdj = this.obtemListaAdjacencias(v);
            this.listaAdj.forEach((e) => {
                var verticeDestino = this.obterVerticeDestino(v, e)
                this.adicionarPasso(8, v, verticeDestino);
                if (this.foiVisitado(verticeDestino)) {
                    this.adicionarPasso(9, v, verticeDestino);
                    this.Q.push(verticeDestino)
                    this.adicionarPasso(10, v, verticeDestino);
                    this.setVisitado(verticeDestino);
                    this.obterCaminhoAteVerticeAtual(v, verticeDestino);
                    this.adicionarCaminhoAresta(v, verticeDestino);
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
            this.caminhoVertice.push(new CaminhoVertice(vertice.id, []))
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