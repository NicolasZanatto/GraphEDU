import * as d3 from "d3";
import { EAlgoritmos } from "../../../../Algoritmos/EAlgoritmos";

export const AtualizarCoresGrafo = (verticeInicial, verticeFinal, nodes, links, simulacao) => {

    switch (simulacao.tipoAlgoritmo) {
        case EAlgoritmos.DFS:
            AtualizarGrafoDFS(verticeInicial, verticeFinal, nodes, links, simulacao);
            break;
        case EAlgoritmos.BFS:
            AtualizarGrafoBFS(verticeInicial, verticeFinal, nodes, links, simulacao);
            break;
        default:
    }
}


export const AtualizarGrafoDFS = (verticeInicial, verticeFinal, nodes, links, simulacao) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    }).attr("fill", vertice => {
            
        const caminho = simulacao.dfs.caminho[simulacao.passo]
        if (caminho === undefined && verticeInicial === vertice.id) {
            return "#32b31b";
        }
        if (caminho === undefined && verticeFinal === vertice.id) {
            return "#f04d4d";
        }

        
        if (caminho === undefined) return "#FFF1D0";
        const verticeVisitado = caminho.listaVisitados.find(x => { return FindVerticeVisitado(x, vertice) });

        

        if (caminho.caminhoVertice.some(o => o === vertice.id)) {
            return "#F8D525"
        }

        if (verticeVisitado === undefined) return "#FFF1D0";

        if (!verticeVisitado.visitado)
            return "#07A0C3";


        return "#DD1C1A";
    })
        .attr("r", vertice => {
            const caminho = simulacao.dfs.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeS === vertice.id || caminho.verticeV === vertice.id) {
                return 18;
            }
            return 15;
        })
}


export const AtualizarGrafoBFS = (verticeInicial, verticeFinal, nodes, links, simulacao) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    }).attr("fill", vertice => {
        if (verticeInicial === vertice.id) {
            return "#32b31b";
        }
        if (verticeFinal === vertice.id) {
            return "#f04d4d";
        }
        const caminho = simulacao.bfs.caminho[simulacao.passo]
        if (caminho === undefined) return "#fff";
        if (caminho.verticeV === vertice.id) {
            return "#e29f0d"
        }
        if (caminho.verticeE === vertice.id) {
            return "#f55a42"
        }
        return "#fff";
    })
        .attr("r", vertice => {
            const caminho = simulacao.bfs.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeE === vertice.id || caminho.verticeV === vertice.id) {
                return 18;
            }
            return 15;
        })
        .attr("stroke", vertice => {
            const caminho = simulacao.bfs.caminho[simulacao.passo]
            if (caminho === undefined) return "black";
            const verticeVisitado = caminho.listaVisitados.find(x => { return FindVerticeVisitado(x, vertice) });

            if (verticeVisitado === undefined) return "black";

            if (!verticeVisitado.visitado)
                return "blue";

            return "red";
        })
}

const FindVerticeVisitado = (obj, vertice) => {
    return obj.idVertice === vertice.id;
}

