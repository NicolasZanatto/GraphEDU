import * as d3 from "d3";


const CorVertice = "#FFF1D0";
const CorVerticeInicial = "#32b31b";
const CorVerticeFinal = "#f04d4d";
const CorCaminhoVertice = "#F8D525";

export const AtualizarGrafoKRUSKAL = (verticeInicial, verticeFinal, nodes, links, simulacao) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    })
        .transition()
        .duration(500)
        .attr("fill", vertice => {
            const caminho = simulacao.kruskal.caminho[simulacao.passo]
            if (verticeInicial === vertice.id) {
                return CorVerticeInicial;
            }
            if (verticeFinal === vertice.id) {
                return CorVerticeFinal;
            }

            if (caminho === undefined) return CorVertice;

            if (caminho.arestaE?.source.id === vertice.id || caminho.arestaE?.target.id === vertice.id) {
                return CorCaminhoVertice;
            }

            return CorVertice;


        })
        .attr("r", vertice => {
            const caminho = simulacao.kruskal.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.arestaE?.source.id === vertice.id || caminho.arestaE?.target.id === vertice.id) {
                return 19;
            }
            return 15;
        })

    AtualizarDistanciasVertice(nodes, simulacao);
    AtualizarAresta(links, simulacao);

}



const AtualizarDistanciasVertice = (nodes, simulacao) => {
    d3.selectAll(".informacoes-vertice").data(nodes, function (d) {
        return d.id;
    }).text(d => {
        const caminho = simulacao.kruskal.caminho[simulacao.passo];
        if (caminho === undefined) return "";
        var paiVertice = caminho.arrayPai.find((distancia) => {
            return distancia.idVertice === d.id
        })
        if (paiVertice === undefined) return "";
        return ObterTextoPaiVertice(paiVertice);
    })
        .attr("stroke", d => {
            const caminho = simulacao.kruskal.caminho[simulacao.passo];
            if (caminho === undefined) return "black";

            
            // if (caminho.verticeV === d.id)
            //     return CorVerticeVisitado

            return "black";

        })
}

const AtualizarAresta = (links, simulacao) => {
    d3.selectAll(`.edge`).data(links, function (d) {
        return "v" + d.source.id + "-v" + d.target.id;
    })
        .transition()
        .duration(500)
        .attr("stroke", aresta => {
            const caminho = simulacao.kruskal.caminho[simulacao.passo];
            if (caminho === undefined) return "black";

            if (caminho.caminhoArestas.some(x => x === aresta.id))
                return CorCaminhoVertice;

            return "black";

        })
}

const ObterTextoPaiVertice = (verticePai) => {
    return `[vpai: ${verticePai.verticePai}]`;
}