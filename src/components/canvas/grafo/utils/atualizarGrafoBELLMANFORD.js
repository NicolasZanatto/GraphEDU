import * as d3 from "d3";


const CorVertice = "#FFF1D0";
const CorVerticeInicial = "#32b31b";
const CorVerticeFinal = "#f04d4d";
const CorVerticeNaoVisitado = "#07A0C3";
const CorVerticeVisitado = "#DD1C1A";

export const AtualizarGrafoBELLMANFORD = (verticeInicial, verticeFinal, nodes, links, simulacao) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    })
    .transition()
    .duration(500)
    .attr("fill", vertice => {
        const caminho = simulacao.bellmanford.caminho[simulacao.passo]
        if (verticeInicial === vertice.id) {
            return CorVerticeInicial;
        }
        if (verticeFinal === vertice.id) {
            return CorVerticeFinal;
        }
        
        if (caminho === undefined) return CorVertice;

        if(vertice.id === caminho.verticeU) return CorVerticeNaoVisitado;

        if(vertice.id === caminho.verticeV) return  CorVerticeVisitado;
        
        return CorVertice;

        
    })
        .attr("r", vertice => {
            const caminho = simulacao.bellmanford.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeU === vertice.id || caminho.verticeV === vertice.id) {
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
    }).text(d => 
            {
                const caminho = simulacao.bellmanford.caminho[simulacao.passo];
                if(caminho === undefined) return "";
                console.log("Dijkstra caminho",caminho);
                var distanciaVertice = caminho.listaDistancia.find((distancia) => {
                    return distancia.idVertice === d.id
                })
                console.log("DistanciaVertice", distanciaVertice);
                if(distanciaVertice === undefined) return "";
                return ObterTextoDistanciaVertice(distanciaVertice.peso,distanciaVertice.verticePai);
            })
            .attr("stroke", d => {
                // const caminho = simulacao.bellmanford.caminho[simulacao.passo];
                // if(caminho === undefined) return "black";
    
                // if(caminho.verticeV === d.id)
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
            const caminho = simulacao.bellmanford.caminho[simulacao.passo];
            if(caminho === undefined) return "black";

            if(caminho.verticeU === aresta.source.id && caminho.verticeV === aresta.target.id)
                return CorVerticeVisitado

            return "black";

        })
}

const ObterTextoDistanciaVertice = (distancia, verticePai) => {
    return `[d: ${distancia  !==  undefined ? distancia.toString() : " ∞ "}; vpai: ${verticePai}]`;
}