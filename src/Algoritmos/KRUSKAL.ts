import { IAresta, IGrafo } from "../store/types/canvasTypes";
import { ICaminhoKRUSKAL, IPai, IRetornoKRUSKAL } from "../store/types/kruskalTypes";

class Retorno implements IRetornoKRUSKAL{
    caminho = new Array<Caminho>();
    /**
     *
     */
     adicionarPasso(
        linha: number,
        arestaE?: IAresta | undefined,
        arrayPai = new Array<IPai>(),
        caminhoArestas = new Array<number>()
    ) {
        this.caminho.push(
            new Caminho(
                linha,
                arrayPai,
                caminhoArestas,
                arestaE
            ));
    }
}

class Caminho implements ICaminhoKRUSKAL {
    linha: number;
    arestaE?: IAresta | undefined;
    arrayPai = new Array<IPai>();
    caminhoArestas = new Array<number>();
    /**
     *
     */
    constructor(linha : number, arrayPai : IPai[], caminhoArestas: number[], arestaE?: IAresta) {
        this.linha = linha;
        arrayPai.forEach(val => this.arrayPai.push(Object.assign({}, val)));
        caminhoArestas.forEach(val => this.caminhoArestas.push(val));
        this.arestaE = arestaE;
    }
}

class Pai implements IPai{
    idVertice: number;
    verticePai: number;
    /**
     *
     */
    constructor(idVertice: number, verticePai: number) {
        this.idVertice = idVertice;
        this.verticePai = verticePai;        
    }
}

class KRUSKAL {
    grafo: IGrafo;
    retorno = new Retorno();
    caminhoArestas = new Array<number>();
    arrayPai = new Array<Pai>();
    constructor(grafo: IGrafo) {
        this.grafo = grafo;
    }

    obterArestasOrdenadas(){
        var copyArestas = [...this.grafo.links];
        return copyArestas.sort((a,b) => {return a.value- b.value});
    }

    adicionarPasso(linha: number, arestaE?: IAresta) {
        this.retorno.adicionarPasso(
            linha,
            arestaE,
            this.arrayPai,
            this.caminhoArestas
        );
    }

    inicializarArrayPai(){
        this.grafo.nodes.forEach(node => {
            this.arrayPai.push(new Pai(node.id, node.id));
        })
    }

    setPai(vertice : number, verticePai : number){
        let copyDistancia = [...this.arrayPai.filter(x => x.idVertice === vertice)];
        copyDistancia[0].verticePai =  verticePai;
    }

    setArestaCaminho(origem?: number, destino?: number) {
        var aresta = this.grafo.dirigido ?
            this.grafo.links.filter(x => x.source.id === origem && x.target.id === destino)[0] :
            this.grafo.links.filter(x => (x.source.id === origem && x.target.id === destino)
                || (x.target.id === origem && x.source.id === destino))[0]

        if (aresta?.id === undefined) return;

        this.caminhoArestas.push(aresta.id);
    }
    
    naoFormaCiclo(aresta: IAresta) {
        var paiOrigem = this.find(aresta.source.id);
        var paiDestino = this.find(aresta.target.id)
        return !(paiOrigem === paiDestino) 

    }

    find(x : number){
        var paiX = this.arrayPai.find(o => o.idVertice === x)?.verticePai;
        if( paiX !== x){
            this.setPai(x, this.find(paiX!))
        }
        return paiX!;
    }
    uniao(x: number, y: number){
        var xset = this.find ( x ) ;
        var yset = this.find ( y ) ;
        if ( xset===yset ) return ;
        this.setPai(xset,yset);
    }
    
    kruskal() {
        this.adicionarPasso(1);
        this.adicionarPasso(2);
        var arestasOrdenadas = this.obterArestasOrdenadas();
        this.adicionarPasso(3);
        this.inicializarArrayPai();
        this.adicionarPasso(4);
        for (let i = 0; i < arestasOrdenadas.length; i++) {
            this.adicionarPasso(5);
            const aresta = arestasOrdenadas[i];
            this.adicionarPasso(6,aresta);
            if(this.naoFormaCiclo(aresta)){
                this.adicionarPasso(7,aresta);
                this.setArestaCaminho(aresta.source.id, aresta.target.id)
                this.adicionarPasso(8,aresta);
                if(this.caminhoArestas.length === this.grafo.nodes.length-1){
                    this.adicionarPasso(9,aresta);
                    return;
                }
                this.uniao(aresta.source.id, aresta.target.id);
                this.adicionarPasso(10,aresta);
            }
            this.adicionarPasso(11);
        }
        this.adicionarPasso(12);
        this.adicionarPasso(13);
    }

    main() {
        console.log("Iniciou Execucao KRUSKAL");
        this.kruskal();

        return this.retorno;
    }

}

export default KRUSKAL; 
