import * as d3 from "d3";


const CorVertice = "#FFF1D0";
const CorVerticeInicial = "#32b31b";
const CorVerticeFinal = "#f04d4d";
const CorCaminhoVertice = "#F8D525";
const CorVerticeVisitado = "#DD1C1A";

export const AtualizarGrafoPRIM = (verticeInicial, verticeFinal, nodes, links, simulacao) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    })
        .transition()
        .duration(500)
        .attr("fill", vertice => {
            const caminho = simulacao.prim.caminho[simulacao.passo]
            if (verticeInicial === vertice.id) {
                return CorVerticeInicial;
            }
            if (verticeFinal === vertice.id) {
                return CorVerticeFinal;
            }

            if (caminho === undefined) return CorVertice;

            // if (vertice.id === caminho.verticeU) return CorVerticeNaoVisitado;

            // if (vertice.id === caminho.verticeV) return CorVerticeVisitado;

            if (caminho.conjuntoU.includes(vertice.id)) {
                return CorCaminhoVertice;
            }

            return CorVertice;


        })
        .attr("r", vertice => {
            const caminho = simulacao.prim.caminho[simulacao.passo]
            if (caminho === undefined) return 13;
            if (caminho.verticeU === vertice.id || caminho.verticeV === vertice.id) {
                return 19;
            }
            return 13;
        })
        .attr("stroke", vertice => {            
            return "black";
        })

    AtualizarDistanciasVertice(nodes, simulacao);
    AtualizarAresta(links, simulacao);

}



const AtualizarDistanciasVertice = (nodes, simulacao) => {
    d3.selectAll(".informacoes-vertice").data(nodes, function (d) {
        return d.id;
    }).text(d => {
        const caminho = simulacao.prim.caminho[simulacao.passo];
        if (caminho === undefined) return "";
        console.log("Dijkstra caminho", caminho);
        var distanciaVertice = caminho.listaDistancia.find((distancia) => {
            return distancia.idVertice === d.id
        })
        console.log("DistanciaVertice", distanciaVertice);
        if (distanciaVertice === undefined) return "";
        return ObterTextoDistanciaVertice(distanciaVertice.peso, distanciaVertice.verticePai);
    })
        .attr("stroke", d => {
            const caminho = simulacao.prim.caminho[simulacao.passo];
            if (caminho === undefined) return "black";

            if (caminho.verticeV === d.id)
                return CorVerticeVisitado

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
            const caminho = simulacao.prim.caminho[simulacao.passo];
            if (caminho === undefined) return "black";

            if (caminho.verticeU === aresta.source.id && caminho.verticeV === aresta.target.id)
                return CorVerticeVisitado;

            if (caminho.caminhoArestas.some(x => x === aresta.id)) {
                return CorCaminhoVertice;
            }
            return "black";

        })
}

const ObterTextoDistanciaVertice = (distancia, verticePai) => {
    return `[d: ${distancia !== undefined ? distancia.toString() : " ∞ "}; vpai: ${verticePai}]`;
}