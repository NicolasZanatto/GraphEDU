import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IRetornoDIJKSTRA, ICaminhoDIJKSTRA, IDistancia,IDistanciaNaoInfinitas } from "../store/types/dijkstraTypes";
import { CaminhoVertice } from "./Common/CaminhoVertice";

class Retorno {
    caminho = new Array<Caminho>();

    adicionarPasso(
        linha: number, 
        q: Array<number>,
        listaAdj: Array<number>,
        listaDistancia: Array<Distancia>, 
        verticeS?: number, 
        verticeV?: number,
        verticeU?: number,
        verticeE?: number,
        ) {
        this.caminho.push(
            new Caminho(
                linha, 
                q,
                listaDistancia, 
                listaAdj, 
                verticeS, 
                verticeV,
                verticeU,
                verticeE));
        }
    }

class Caminho {
    linha: number;
    verticeS?: number;
    verticeU?: number;
    verticeV?: number;
    verticeE?: number;
    q = new Array<number>();
    listaAdj = new Array<number>();
    listaDistancia = new Array<Distancia>();

    constructor(linha: number,q: Array<number>, listaDistancia: Array<Distancia>, listaAdj: Array<number>, verticeS?: number, verticeV?: number, verticeU?: number, verticeE?: number) {
        this.verticeS = verticeS;
        this.verticeV = verticeV;
        this.verticeE = verticeE;
        this.verticeU = verticeU;
        this.linha = linha;
        this.q = q;
        this.listaAdj = listaAdj;
        listaDistancia.forEach(val => this.listaDistancia.push(Object.assign({}, val)));
    }
}

class Distancia implements IDistancia {
    idVertice: number;
    peso?: number;
    infinito: boolean
    constructor(idVertice: number, peso?:number) {
        this.idVertice = idVertice;
        this.peso = peso;
        this.infinito = peso === undefined;
    }
}

class DistanciaNaoNula {
    idVertice: number;
    peso: number;
    constructor(idVertice: number, peso:number) {
        this.idVertice = idVertice;
        this.peso = peso;
    }
}

class DIJKSTRA {
    grafo: IGrafo;
    retorno = new Retorno();
    distancia = new Array<Distancia>();
    adj = Array<IAresta>();
    caminhoVertice = new Array<CaminhoVertice>()
    Q = new Array<number>();

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    adicionarPasso(linha: number, verticeS?: number, verticeV?: number, verticeU?: number, verticeE?: number) {
        this.retorno.adicionarPasso(
            linha, 
            this.Q,
            this.obterVerticesAdjacentes(this.adj, verticeS),
            this.distancia,
            verticeS,
            verticeV,
            verticeU,
            verticeE);
    }

    obterVerticeComDistanciaMinima(){
        var distancias = this.distancia
                            .filter(o => !o.infinito)
                            .map(m => new DistanciaNaoNula(m.idVertice,m.peso ?? 1));

        distancias.sort((a,b) => {return (b.peso - a.peso)});
        return distancias[0];
    }


    obterVerticeDestino(v: number | undefined, aresta: IAresta) {
        return aresta.source.id === v ? aresta.target.id : aresta.source.id;
    }

    obterArestaUV(u: number,v: number){
        return this.grafo.links.filter(o => o.source.id === u && o.target.id === v)[0];
    }

    obtemListaAdjacencias(s: number) {
        return this.grafo.links.filter((aresta) => {
            return this.grafo.dirigido ? (aresta.source.id === s) : (aresta.source.id === s || aresta.target.id === s)
        });
    }

    obterDistancia(vertice : number){
        return this.distancia.filter(o => o.idVertice === vertice)[0]
    }

    obterVerticesAdjacentes(listaAdj: Array<IAresta>, verticeInicial?: number) {
        if(verticeInicial === undefined) return [];
        var verticesAdjacentesOrigem = listaAdj.map(x => x.source.id).filter(x => { return x !== verticeInicial });
        var verticesAdjacentesDestino = listaAdj.map(x => x.target.id).filter(x => { return x !== verticeInicial });
        return verticesAdjacentesOrigem.concat(verticesAdjacentesDestino);
    }

    dijkstra(s: number) {
        this.grafo.nodes.forEach((vertice) => {
            this.adicionarPasso(2, undefined, undefined);
            this.adicionarPasso(3, undefined, undefined);
            this.distancia.push(new Distancia(vertice.id));
            this.adicionarPasso(4, undefined, vertice.id);
        });
        this.adicionarPasso(5);
        this.adicionarPasso(6,s);
        this.Q = this.grafo.nodes.map(vertice => vertice.id);
        this.adicionarPasso(7);
        while(this.Q.length > 0){
            var u = this.obterVerticeComDistanciaMinima();
            if(u.idVertice === this.grafo.verticeFinal){
                return;
            }
            this.adj = this.obtemListaAdjacencias(u.idVertice);
            this.adj.forEach(aresta => {
                var v = this.obterVerticeDestino(u.idVertice, aresta)
                if(this.Q.includes(v)){
                    var e = this.obterArestaUV(u.idVertice, v);
                    if(this.distancia){
                        
                    }
                }
            })
        }


    }

    main() {
        this.dijkstra(this.grafo.verticeInicial ?? 1);
        
    }

}

export default DIJKSTRA;