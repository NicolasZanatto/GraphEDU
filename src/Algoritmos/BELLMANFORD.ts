import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IRetornoBELLMANFORD, ICaminhoBELLMANNFORD, IDistancia,IDistanciaNaoInfinitas } from "../store/types/bellmanFordTypes";
import { CaminhoVertice } from "./Common/CaminhoVertice";

class Retorno implements IRetornoBELLMANFORD {
    caminho = new Array<Caminho>();

    adicionarPasso(
        linha: number, 
        q: Array<number>,
        listaAdj: Array<number>,
        listaDistancia: Array<Distancia>, 
        verticeS?: number, 
        verticeV?: number,
        verticeU?: number,
        distanciaU?: number,
        distanciaV?: number,
        arestaE?: number,
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
                distanciaV,
                distanciaU,
                arestaE));
        }
    }

class Caminho  implements ICaminhoBELLMANNFORD{
    linha: number;
    verticeS?: number;
    verticeU?: number;
    verticeV?: number;
    distanciaU?: number;
    distanciaV?: number;
    arestaE?: number;
    conjuntoQ = new Array<number>();
    listaAdj = new Array<number>();
    listaDistancia = new Array<Distancia>();

    constructor(
        linha: number,
        conjuntoQ: Array<number>, 
        listaDistancia: Array<Distancia>, 
        listaAdj: Array<number>, 
        verticeS?: number, 
        verticeV?: number, 
        verticeU?: number, 
        distanciaV?: number,
        distanciaU?: number,
        arestaE?: number) {
            this.verticeS = verticeS;
            this.verticeV = verticeV;
            this.distanciaV = distanciaV;
            this.distanciaU = distanciaU;
            this.arestaE = arestaE;
            this.verticeU = verticeU;
            this.linha = linha;
            conjuntoQ.forEach(val => this.conjuntoQ.push(val));
            this.listaAdj = listaAdj;
            listaDistancia.forEach(val => this.listaDistancia.push(Object.assign({}, val)));
    }
}

class Distancia implements IDistancia {
    idVertice: number;
    peso?: number;
    infinito: boolean;
    verticePai: number;
    constructor(idVertice: number, verticePai : number, peso?:number) {
        this.idVertice = idVertice;
        this.peso = peso;
        this.infinito = peso === undefined;
        this.verticePai = verticePai;
    }
}

class DistanciaNaoInfinitas implements IDistanciaNaoInfinitas {
    idVertice: number;
    peso: number;
    constructor(idVertice: number, peso:number) {
        this.idVertice = idVertice;
        this.peso = peso;
    }
}

class BELLMANFORD {
    grafo: IGrafo;
    retorno = new Retorno();
    distancia = new Array<Distancia>();
    adj = Array<IAresta>();
    caminhoVertice = new Array<CaminhoVertice>()
    Q = new Array<number>();

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    adicionarPasso(linha: number, verticeS?: number, verticeV?: number, verticeU?: number, arestaE?: number) {
        this.retorno.adicionarPasso(
            linha, 
            this.Q,
            this.obterVerticesAdjacentes(this.adj, verticeU),
            this.distancia,
            verticeS,
            verticeV,
            verticeU,
            this.obterDistancia(verticeU),
            this.obterDistancia(verticeV),
            arestaE);
    }

     obterVerticeComDistanciaMinima(){
        var distancias = this.distancia
                            .filter(o => this.Q.includes(o.idVertice))
                            .map(m => new DistanciaNaoInfinitas(m.idVertice, m.peso ?? 100000));

        distancias.sort((a,b) => {return a.peso- b.peso})
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

    obterDistancia(vertice? : number){
        return this.distancia.find(o => o.idVertice === vertice)?.peso ?? 10000000
    }

    setDistancia(vertice : number, valor: number, verticePai : number){
        let copyDistancia = [...this.distancia.filter(x => x.idVertice === vertice)];
        copyDistancia[0].peso =  valor;
        copyDistancia[0].infinito =  false;
        copyDistancia[0].verticePai = verticePai;
    }

    obterVerticesAdjacentes(listaAdj: Array<IAresta>, verticeInicial?: number) {
        if(verticeInicial === undefined) return [];
        var verticesAdjacentesOrigem = listaAdj.map(x => x.source.id).filter(x => { return x !== verticeInicial });
        var verticesAdjacentesDestino = listaAdj.map(x => x.target.id).filter(x => { return x !== verticeInicial });
        return verticesAdjacentesOrigem.concat(verticesAdjacentesDestino);
    }

    removerVerticeConjuntoQ(vertice : number){
        var index = this.Q.indexOf(vertice);
        this.Q.splice(index, 1);
    }

    bellmanford(s: number) {
        this.grafo.nodes.forEach((vertice) => {
            this.adicionarPasso(2, s, undefined);
            this.adicionarPasso(3, s, vertice.id);
            this.distancia.push(new Distancia(vertice.id, 0));
            this.adicionarPasso(4, s, vertice.id);
        });
        this.adicionarPasso(5,s);
        this.setDistancia(s, 0, s);
        this.adicionarPasso(6,s);
        this.Q = this.grafo.nodes.map(vertice => vertice.id);
        this.adicionarPasso(7,s);
        while(this.Q.length > 0){
            this.adicionarPasso(8,s);
            let u = this.obterVerticeComDistanciaMinima();
            this.adicionarPasso(9,s,undefined, u.idVertice, undefined);
            
            if(u.idVertice === this.grafo.verticeFinal){
                this.adicionarPasso(10,s,undefined, u.idVertice, undefined);
                return;
            }
            this.adicionarPasso(11,s,undefined, u.idVertice, undefined);
            this.adj = this.obtemListaAdjacencias(u.idVertice);
            this.adj.forEach(aresta => {
                console.log(`Arestas Adj do vértice ${u.idVertice}`, this.adj);
                var v = this.obterVerticeDestino(u.idVertice, aresta)
                this.adicionarPasso(12,s,v, u.idVertice, undefined);
                if(this.Q.includes(v)){
                    this.adicionarPasso(13,s, v, u.idVertice, undefined);
                    var e = this.obterArestaUV(u.idVertice, v);
                    var distanciaU = this.obterDistancia(u.idVertice);
                    this.adicionarPasso(14,s,v, u.idVertice, e.value);
                    if(this.obterDistancia(v) > distanciaU + e.value){
                        this.adicionarPasso(15,s,v, u.idVertice, e.value);
                        console.log("DistanciaU", distanciaU);
                        console.log("e.value", e.value);
                        this.setDistancia(v, distanciaU + e.value, u.idVertice);
                        this.adicionarPasso(16,s,v, u.idVertice, e.value);
                    }
                    this.adicionarPasso(17,s,v, u.idVertice, e.value);

                }
                this.adicionarPasso(18,s,v, u.idVertice, undefined);
                this.adj = [];
            });
            this.adicionarPasso(19,s,undefined, u.idVertice);
            this.removerVerticeConjuntoQ(u.idVertice);

        }

        console.log("Distancia Dijkstra:", this.distancia);;
    }

    main() {
        console.log("Iniciou Execucao DIJKSTRA");
        this.bellmanford(this.grafo.verticeInicial ?? 1);

        return this.retorno;
     }

}

export default BELLMANFORD;