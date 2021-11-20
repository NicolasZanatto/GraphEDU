import * as d3 from "d3";

const CorVertice = "#FFF1D0";
const CorVerticeInicial = "#32b31b";
const CorVerticeFinal = "#f04d4d";
const CorCaminhoVertice = "#F8D525";
const CorVerticeNaoVisitado = "#07A0C3";
const CorVerticeVisitado = "#DD1C1A";

export const AtualizarGrafoBFS = (verticeInicial, verticeFinal, nodes, links, simulacao) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    })
    .transition()
    .duration(500)
    .attr("fill", vertice => {
        const caminho = simulacao.bfs.caminho[simulacao.passo]
        if (verticeInicial === vertice.id) {
            return CorVerticeInicial;
        }
        if (verticeFinal === vertice.id) {
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
            if (caminho === undefined) return 13;
            if (caminho.verticeE === vertice.id || caminho.verticeV === vertice.id) {
                return 19;
            }
            return 13;
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

        d3.selectAll(`.edge`).data(links, function (d) {
            return "v" + d.source.id + "-v" + d.target.id;
            })
            .transition()
            .duration(500)
            .attr("stroke", aresta => {
                const caminho = simulacao.bfs.caminho[simulacao.passo];
                if(caminho === undefined) return "black";
    
                if(caminho.caminhoAresta.includes(aresta.id))
                    return CorVerticeVisitado
    
                return "black";
    
            })
}

const FindVerticeVisitado = (obj, vertice) => {
    return obj.idVertice === vertice.id;
}