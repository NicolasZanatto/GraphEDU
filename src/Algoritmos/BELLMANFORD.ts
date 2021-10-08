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
        tempDistancia?: number
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
                arestaE,
                tempDistancia));
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
    tempDistancia?: number

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
        arestaE?: number,
        tempDistancia?: number) {
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
            this.tempDistancia = tempDistancia;
    }
}

class Distancia implements IDistancia {
    idVertice: number;
    peso?: number;
    infinito: boolean;
    verticePai?: number;
    constructor(idVertice: number, verticePai? : number, peso?:number) {
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

    adicionarPasso(linha: number, verticeS?: number, verticeU?: number, verticeV?: number, arestaE?: number, tempDistancia?: number) {
        this.retorno.adicionarPasso(
            linha, 
            this.Q,
            this.obterVerticesAdjacentes(this.adj, verticeU),
            this.distancia,
            verticeS,
            verticeV,
            verticeU,
            verticeU !== undefined ? this.obterDistancia(verticeU) : undefined,
            verticeV !== undefined ? this.obterDistancia(verticeV) : undefined,
            arestaE,
            tempDistancia);
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
        this.adicionarPasso(1);
        this.grafo.nodes.forEach((vertice) => {
            this.adicionarPasso(2, s, undefined);
            this.adicionarPasso(3, s, undefined, vertice.id);
            this.distancia.push(new Distancia(vertice.id));
            this.adicionarPasso(4, s, undefined, vertice.id);
        });
        this.adicionarPasso(5,s);
        this.setDistancia(s, 0, s);
        this.adicionarPasso(6,s);

        for(let i = 1; i<this.grafo.nodes.length;i++){
            this.adicionarPasso(7,s);
            this.grafo.links.forEach(aresta => {
                var u = aresta.source.id;
                var v = aresta.target.id;

                this.adicionarPasso(8, s, u, v, aresta.value);
                var tempDistancia : number | undefined = this.obterDistancia(u) + aresta.value;
                this.adicionarPasso(9,s,aresta.source.id, aresta.target.id, aresta.value, tempDistancia);

                if(tempDistancia < this.obterDistancia(v)){
                    this.adicionarPasso(10,s,aresta.source.id, aresta.target.id, aresta.value, tempDistancia);
                    this.setDistancia(v, tempDistancia, u);
                }
                this.adicionarPasso(11,s,aresta.source.id, aresta.target.id, aresta.value, tempDistancia);
                this.adicionarPasso(12,s,aresta.source.id, aresta.target.id, aresta.value, tempDistancia);
            });

            this.adicionarPasso(13,s);
        }
        this.adicionarPasso(14,s);
        this.grafo.links.forEach(aresta => {
            var u = aresta.source.id;
            var v = aresta.target.id;

            this.adicionarPasso(15, s, u, v, aresta.value);
            if(this.obterDistancia(u) + aresta.value < this.obterDistancia(v)){
                this.adicionarPasso(16, s, u, v, aresta.value);
            }
            this.adicionarPasso(17, s, u, v, aresta.value);
        });

        this.adicionarPasso(18, s);
        this.adicionarPasso(19, s);
    }

    main() {
        console.clear();
        console.log("Iniciou a Execução do BELLMAN FORD");
        this.bellmanford(this.grafo.verticeInicial ?? 1);

        return this.retorno;
     }

}

export default BELLMANFORD;