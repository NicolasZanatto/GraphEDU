import * as d3 from "d3";


export const AtualizarCorVerticeInicialEVerticeFinal = (verticeInicial, verticeFinal, nodes) => {

    d3.selectAll("circle").data(nodes, function (d) {
        return d.id;
    }).attr("fill", vertice => {
        if (verticeInicial === vertice.id) {
            return "#32b31b";
        }
        if (verticeFinal === vertice.id)
            return "#f04d4d";

        return "#fff";
    });
}

export const AtualizarCaminhoGrafo = (simulacao, nodes) => {
    setTimeout(() => {
        d3.selectAll("circle").data(nodes, function (d) {
            return d.id;
        }).attr("r", vertice => {
            const caminho = simulacao.dfs.caminho[simulacao.dfs.passo]
            if (caminho === undefined) return 15;
            if (caminho.verticeInicial === vertice.id || caminho.verticeFinal === vertice.id) {
                return 18;
            }
            return 15;
        });

        console.log("Passo",)
    }, 1000);
}