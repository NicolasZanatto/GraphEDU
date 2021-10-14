import { IGrafo } from "../store/types/canvasTypes";
import { ICaminhoFLOYDWARSHALL, IRetornoFLOYDWARSHALL, IDistancia } from "../store/types/floydWarshallTypes";

class Retorno implements IRetornoFLOYDWARSHALL {
    caminho = new Array<Caminho>();

    adicionarPasso(
        linha: number,
        matrizDistancia: Distancia[][],
        verticeI?: number,
        verticeJ?: number,
        verticeK?: number,
        distanciaIJ?: number,
        distanciaIK?: number,
        distanciaKJ?: number,

    ) {
        this.caminho.push(
            new Caminho(
                linha,
                matrizDistancia,
                verticeI,
                verticeJ,
                verticeK,
                distanciaIJ,
                distanciaIK,
                distanciaKJ
            )
        );
    }
}

class Caminho implements ICaminhoFLOYDWARSHALL {
    linha: number;
    verticeI?: number;
    verticeJ?: number;
    verticeK?: number;
    distanciaIJ?: number;
    distanciaIK?: number;
    distanciaKJ?: number;
    matrizDistancia: Distancia[][]

    constructor(
        linha: number,
        matrizDistancia: Distancia[][],
        verticeI?: number,
        verticeJ?: number,
        verticeK?: number,
        distanciaIJ?: number,
        distanciaIK?: number,
        distanciaKJ?: number,
    ) {
        this.linha = linha;
        this.verticeI = verticeI;
        this.verticeJ = verticeJ;
        this.verticeK = verticeK;
        this.distanciaIJ = distanciaIJ;
        this.distanciaIK = distanciaIK;
        this.distanciaKJ = distanciaKJ;
        this.matrizDistancia = [];
        matrizDistancia.forEach(val => this.matrizDistancia.push(val.slice()))
    }
}

class Distancia implements IDistancia {
    peso?: number;
    infinito: boolean;
    constructor(peso?: number) {
        this.peso = peso;
        this.infinito = peso === undefined;
    }
}

class FLOYDWARSHALL {
    grafo: IGrafo;
    retorno = new Retorno();
    matrizDistancia: Distancia[][];
    constructor(grafo: IGrafo) {
        this.grafo = grafo;

        this.matrizDistancia = [];
        for (var i: number = 0; i < this.grafo.nodes.length; i++) {
            this.matrizDistancia[i] = [];
            for (var j: number = 0; j < this.grafo.nodes.length; j++) {
                this.matrizDistancia[i][j] = new Distancia();
            }
        }

    }

    adicionarPasso(linha: number, verticeI?: number, verticeJ?: number, verticeK?: number) {
        this.retorno.adicionarPasso(
            linha,
            this.matrizDistancia,
            verticeI,
            verticeJ,
            verticeK,
            this.obterDistanciaPesoRetorno(verticeI, verticeJ),
            this.obterDistanciaPesoRetorno(verticeI, verticeK),
            this.obterDistanciaPesoRetorno(verticeK, verticeJ)
        );
    }

    existeArestaIJ(i: number, j: number) {
        return this.grafo.links.some(o => o.source.id === i && o.target.id === j);
    }

    obterDistanciaPesoRetorno(origem?: number, destino?: number) {
        if (origem === undefined || destino === undefined) return 100000;

        return this.obterDistanciaPeso(origem.valueOf(), destino.valueOf());
    }
    obterDistanciaPeso(origem: number, destino: number) {
        return this.matrizDistancia[origem - 1][destino - 1]?.peso ?? 100000;
    }

    setDistancia(origem: number, destino: number, valor?: number) {

        this.matrizDistancia[origem - 1][destino - 1] = new Distancia(valor);
    }

    obterPesoArestaGrafo(origem: number, destino: number) {
        return this.grafo.links.find(o => o.source.id === origem && o.target.id === destino)?.value;
    }

    verificaCaminhoExiste(verticeI: number, verticeJ: number, verticeK: number) {
        if (!this.grafo.links.some(o => o.source.id === verticeI && o.target.id === verticeK)) return false;
        if (!this.grafo.links.some(o => o.source.id === verticeK && o.target.id === verticeJ)) return false;

        return true;
    }

    floydWarshall() {
        this.adicionarPasso(1);
        this.adicionarPasso(2);
        for (let i = 1; i <= this.grafo.nodes.length; i++) {
            this.adicionarPasso(3, i);
            for (let j = 1; j <= this.grafo.nodes.length; j++) {
                this.adicionarPasso(4, i, j);
                if (this.existeArestaIJ(i, j)) {
                    this.adicionarPasso(5, i, j)
                    this.setDistancia(i, j, this.obterPesoArestaGrafo(i, j));
                }
                else {
                    this.adicionarPasso(6, i, j);
                    this.adicionarPasso(7, i, j);
                    this.setDistancia(i, j);
                }
                this.adicionarPasso(8, i, j);
            }
            this.adicionarPasso(9, i);
        }
        this.adicionarPasso(10);

        this.adicionarPasso(11);
        for (let k = 1; k <= this.grafo.nodes.length; k++) {
            this.adicionarPasso(12, undefined, undefined, k);
            for (let i = 1; i <= this.grafo.nodes.length; i++) {
                this.adicionarPasso(13, i, undefined, k);
                for (let j = 1; j <= this.grafo.nodes.length; j++) {
                    this.adicionarPasso(14, i, j, k);
                    if (this.verificaCaminhoExiste(i, j, k) &&
                        (this.obterDistanciaPeso(i, j) > this.obterDistanciaPeso(i, k) + this.obterDistanciaPeso(k, j))) {
                        this.adicionarPasso(15, i, j, k);
                        this.setDistancia(i, j, this.obterDistanciaPeso(i, k) + this.obterDistanciaPeso(k, j));
                    }
                    this.adicionarPasso(16, i, j, k);
                }
                this.adicionarPasso(17, i, undefined, k);
            }
            this.adicionarPasso(18, undefined, undefined, k);
        }
        this.adicionarPasso(19);
        this.adicionarPasso(20);
    }
    main() {
        console.clear();
        console.log("Iniciou a Execução do FLOYD WARSHALL");
        this.floydWarshall();
        console.log("Resultado:", this.retorno.caminho.map(o => o.matrizDistancia));

        return this.retorno;
    }

}

export default FLOYDWARSHALL;