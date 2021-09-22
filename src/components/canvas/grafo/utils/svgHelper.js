import * as d3 from "d3";
import { EAlgoritmos } from "../../../../Algoritmos/EAlgoritmos";

const CorVertice = "#FFF1D0";
const CorVerticeInicial = "#32b31b";
const CorVerticeFinal = "#f04d4d";
const CorCaminhoVertice = "#F8D525";
const CorVerticeNaoVisitado = "#07A0C3";
const CorVerticeVisitado = "#DD1C1A";

export const AtualizarCoresGrafo = (verticeInicial, verticeFinal, nodes, links, simulacao, styles) => {

    switch (simulacao.tipoAlgoritmo) {
        case EAlgoritmos.DFS:
            AtualizarGrafoDFS(verticeInicial, verticeFinal, nodes, links, simulacao,styles);
            break;
        case EAlgoritmos.BFS:
            AtualizarGrafoBFS(verticeInicial, verticeFinal, nodes, links, simulacao);
            break;
        default:
    }
}


export const AtualizarGrafoDFS = (verticeInicial, verticeFinal, nodes, links, simulacao, styles) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    }).attr("fill", vertice => {            
        const caminho = simulacao.dfs.caminho[simulacao.passo]
        if (caminho === undefined && verticeInicial === vertice.id) {
            return CorVerticeInicial;
        }
        if (caminho === undefined && verticeFinal === vertice.id) {
            return CorVerticeFinal;
        }
        
        if (caminho === undefined) return CorVertice;
        
        const verticeVisitado = caminho.listaVisitados.find(x => { return FindVerticeVisitado(x, vertice) });
        if (caminho.caminhoVertice.some(o => o === vertice.id)) {
            return CorCaminhoVertice;
        }

        if (verticeVisitado === undefined) return CorVertice;

        if (!verticeVisitado.visitado)
            return CorVerticeNaoVisitado;


        return CorVerticeVisitado;
    })
        .attr("r", vertice => {
            const caminho = simulacao.dfs.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeS === vertice.id || caminho.verticeV === vertice.id) {
                return 18;
            }
            return 15;
        });


    // Atualização arestas:

    d3.selectAll(`${styles.edge}`).data(links, function (d) {
        return "v" + d.source.id + "-v" + d.target.id;
      })
      .attr("fill", aresta => {
            const caminho = simulacao.dfs.caminho[simulacao.passo];
            if(caminho === undefined) return "black";

            if((caminho.verticeS === aresta.source.id && caminho.verticeV === aresta.target.id) || (caminho.verticeS === aresta.target.id && caminho.verticeV === aresta.source.id))
                return "#F8D525";

            return "black";

      })
}


export const AtualizarGrafoBFS = (verticeInicial, verticeFinal, nodes, links, simulacao) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    }).attr("fill", vertice => {
        const caminho = simulacao.bfs.caminho[simulacao.passo]
        if (caminho === undefined && verticeInicial === vertice.id) {
            return CorVerticeInicial;
        }
        if (caminho === undefined && verticeFinal === vertice.id) {
            return CorVerticeFinal;
        }
        
        if (caminho === undefined) return CorVertice;
        
        const verticeVisitado = caminho.listaVisitados.find(x => { return FindVerticeVisitado(x, vertice) });
        if (caminho.filaQ.some(o => o === vertice.id)) {
            return CorCaminhoVertice;
        }

        if (verticeVisitado === undefined) return CorVertice;

        if (!verticeVisitado.visitado)
            return CorVerticeNaoVisitado;


        return CorVerticeVisitado;

        
    })
        .attr("r", vertice => {
            const caminho = simulacao.bfs.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeE === vertice.id || caminho.verticeV === vertice.id) {
                return 19;
            }
            return 15;
        })
        .attr("stroke", vertice => {
            const caminho = simulacao.bfs.caminho[simulacao.passo]
            if (caminho === undefined) return "black";
            const verticeVisitado = caminho.listaVisitados.find(x => { return FindVerticeVisitado(x, vertice) });

            if (verticeVisitado === undefined) return "black";

            if (!verticeVisitado.visitado)
                return CorVerticeNaoVisitado;

            return CorVerticeVisitado;
        })
}

const FindVerticeVisitado = (obj, vertice) => {
    return obj.idVertice === vertice.id;
}

