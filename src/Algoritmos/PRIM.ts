import { IGrafo, IAresta } from "../store/types/canvasTypes";
import { IRetornoPRIM, ICaminhoPRIM, IDistancia } from "../store/types/primTypes";

class Retorno implements IRetornoPRIM {
    caminho = new Array<Caminho>();

    adicionarPasso(
        linha: number,
        conjuntoU: Array<number>,
        listaAdj: Array<number>,
        listaDistancia: Array<Distancia>,
        verticeV?: number,
        verticeU?: number,
        distanciaU?: number,
        distanciaV?: number,
        arestaE?: number,
    ) {
        this.caminho.push(
            new Caminho(
                linha,
                conjuntoU,
                listaDistancia,
                listaAdj,
                verticeV,
                verticeU,
                distanciaV,
                distanciaU,
                arestaE));
    }
}

class Caminho implements ICaminhoPRIM {
    linha: number;
    verticeU?: number;
    verticeV?: number;
    distanciaU?: number;
    distanciaV?: number;
    arestaE?: number;
    conjuntoU = new Array<number>();
    listaAdj = new Array<number>();
    listaDistancia = new Array<Distancia>();

    constructor(
        linha: number,
        conjuntoU: Array<number>,
        listaDistancia: Array<Distancia>,
        listaAdj: Array<number>,
        verticeV?: number,
        verticeU?: number,
        distanciaV?: number,
        distanciaU?: number,
        arestaE?: number) {
        this.verticeV = verticeV;
        this.distanciaV = distanciaV;
        this.distanciaU = distanciaU;
        this.arestaE = arestaE;
        this.verticeU = verticeU;
        this.linha = linha;
        conjuntoU.forEach(val => this.conjuntoU.push(val));
        this.listaAdj = listaAdj;
        listaDistancia.forEach(val => this.listaDistancia.push(Object.assign({}, val)));
    }
}

class Distancia implements IDistancia {
    idVertice: number;
    peso?: number;
    infinito: boolean;
    verticePai: number;
    constructor(idVertice: number, verticePai: number, peso?: number) {
        this.idVertice = idVertice;
        this.peso = peso;
        this.infinito = peso === undefined;
        this.verticePai = verticePai;
    }
}

class PRIM {
    grafo: IGrafo;
    retorno = new Retorno();
    distancia = new Array<Distancia>();
    conjuntoU = new Array<number>();
    verticesAdjacentes = Array<IAresta>();

    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    adicionarPasso(linha: number, verticeU?: number, verticeV?: number, arestaE?: number) {
        this.retorno.adicionarPasso(
            linha,
            this.conjuntoU,
            this.obterVerticesAdjacentes(this.verticesAdjacentes, verticeU),
            this.distancia,
            verticeU,
            verticeV,
            this.obterDistancia(verticeU),
            this.obterDistancia(verticeV),
            arestaE);
    }

    obterDistancia(vertice?: number) {
        return this.distancia.find(o => o.idVertice === vertice)?.peso ?? 10000000
    }

    obterArestaUV(u: number, v: number) {
        return this.grafo.links.filter(o => o.source.id === u && o.target.id === v)[0];
    }

    obterVerticeDestino(v: number | undefined, aresta: IAresta) {
        return aresta.source.id === v ? aresta.target.id : aresta.source.id;
    }

    obterMenorDistanciaNaoVisitada() {
        var distancias = this.distancia.filter(o => !o.infinito && !this.conjuntoU.includes(o.idVertice))
        distancias.sort((a, b) => { return (a.peso ?? 100000) - (b.peso ?? 100000) })
        return distancias[0];
    }

    obterVerticesAdjacentes(listaAdj: Array<IAresta>, verticeInicial?: number) {
        if (verticeInicial === undefined) return [];
        var verticesAdjacentesOrigem = listaAdj.map(x => x.source.id).filter(x => { return x !== verticeInicial });
        var verticesAdjacentesDestino = listaAdj.map(x => x.target.id).filter(x => { return x !== verticeInicial });
        return verticesAdjacentesOrigem.concat(verticesAdjacentesDestino);
    }

    setListaAdjacencias(s: number) {
        this.verticesAdjacentes = this.grafo.links.filter((aresta) => {
            return this.grafo.dirigido ? (aresta.source.id === s) : (aresta.source.id === s || aresta.target.id === s)
        });
    }

    setDistancia(vertice: number, valor: number, verticePai: number) {
        let copyDistancia = [...this.distancia.filter(x => x.idVertice === vertice)];
        copyDistancia[0].peso = valor;
        copyDistancia[0].infinito = false;
        copyDistancia[0].verticePai = verticePai;
    }

    prim(s: number) {
        this.adicionarPasso(1);
        this.adicionarPasso(2);
        this.grafo.nodes.forEach((vertice) => {
            this.adicionarPasso(3, undefined, vertice.id);
            this.distancia.push(new Distancia(vertice.id, 0));
            this.adicionarPasso(4, undefined, vertice.id);
        });
        this.adicionarPasso(5, undefined);
        this.setDistancia(s, 0, s);
        this.adicionarPasso(6, undefined);
        let ConjuntoV = this.grafo.nodes.map(o => o.id);
        for (let i = 0; i < ConjuntoV.length; i++) {
            this.adicionarPasso(7, undefined);
            let u = this.obterMenorDistanciaNaoVisitada();
            this.adicionarPasso(8, u.idVertice);
            this.conjuntoU.push(u.idVertice);
            this.adicionarPasso(9, u.idVertice);
            console.log(`Visitou o vértice ${u.idVertice} com peso ${u.peso}`);
            this.setListaAdjacencias(u.idVertice)
            this.verticesAdjacentes.forEach(aresta => {
                var v = this.obterVerticeDestino(u.idVertice, aresta)
                this.adicionarPasso(10, u.idVertice, v);

                if (!this.conjuntoU.includes(v) && aresta.value < this.obterDistancia(v)) {
                    this.adicionarPasso(11, u.idVertice, v, aresta.value);
                    this.setDistancia(v, aresta.value, u.idVertice);
                    this.adicionarPasso(12, u.idVertice, v, aresta.value);
                }
            })
            this.adicionarPasso(13, u.idVertice);
        }
        this.adicionarPasso(14);
    }

    main() {
        console.log("Iniciou Execucao PRIM");
        this.prim(this.grafo.verticeInicial ?? 1);

        return this.retorno;
    }

}

export default PRIM;