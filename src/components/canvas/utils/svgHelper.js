import * as d3 from "d3";

export const AtualizarCoresGrafo = (verticeInicial, verticeFinal, nodes, links, simulacao) => {

    d3.selectAll("circle").data(nodes, function (d) {
        return d.id;
    }).attr("fill", vertice => {
        if (verticeInicial === vertice.id) {
            return "#32b31b";
        }
        if (verticeFinal === vertice.id) {
            return "#f04d4d";
        }
        const caminho = simulacao.dfs.caminho[simulacao.passo]
        if (caminho === undefined) return "#fff";
        if (caminho.verticeInicial === vertice.id || caminho.verticeFinal === vertice.id) {
            return "#e29f0d"
        }
        return "#fff";
    })
        .attr("r", vertice => {
            const caminho = simulacao.dfs.caminho[simulacao.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeInicial === vertice.id || caminho.verticeFinal === vertice.id) {
                return 18;
            }
            return 15;
        });

}
