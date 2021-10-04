import * as d3 from "d3";


const CorVertice = "#FFF1D0";
const CorVerticeInicial = "#32b31b";
const CorVerticeFinal = "#f04d4d";
const CorCaminhoVertice = "#F8D525";
const CorVerticeNaoVisitado = "#07A0C3";
const CorVerticeVisitado = "#DD1C1A";

export const AtualizarGrafoDFS = (verticeInicial, verticeFinal, nodes, links, simulacao, styles) => {
    d3.selectAll(".CircleCanvas").data(nodes, function (d) {
        return d.id;
    })
    .transition()
    .attr("fill", vertice => {            
        const caminho = simulacao.dfs.caminho[simulacao.passo]
        if (verticeInicial === vertice.id) {
            return CorVerticeInicial;
        }
        if (verticeFinal === vertice.id) {
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
        .transition()
        .attr("r", vertice => {
            const caminho = simulacao.dfs.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeS === vertice.id || caminho.verticeV === vertice.id) {
                return 19;
            }
            return 15;
        });

        d3.selectAll(`.edge`).data(links, function (d) {
            return "v" + d.source.id + "-v" + d.target.id;
            })
            .transition()
            .duration(500)
            .attr("stroke", aresta => {
                const caminho = simulacao.dfs.caminho[simulacao.passo];
                if(caminho === undefined) return "black";
    
                if(caminho.caminhoAresta.includes(aresta.id))
                    return CorVerticeVisitado
    
                return "black";
    
            })
}

const FindVerticeVisitado = (obj, vertice) => {
    return obj.idVertice === vertice.id;
}