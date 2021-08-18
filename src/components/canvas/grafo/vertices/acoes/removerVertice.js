export const removerVertice = (nodes, links, verticeSelecionado, removeNodeAction) => {

    console.log("Remover Vértices", nodes);
    console.log("Remover Vértices", links);
    const tamanho = links.length;
    for (let i = tamanho - 1; i >= 0; i--) {
        console.log("links.length:", links.length);
        console.log("i:", i);
        console.log("links[i].source.id:", links[i].source.id);
        console.log("verticeSelecionado.id:", verticeSelecionado.id);
        console.log("links[i].target.id:", links[i].target.id);
        if (links[i].source.id === verticeSelecionado.id || links[i].target.id === verticeSelecionado.id) {
            links.splice(i, 1);
            console.log("Entrou remove")
        }

    }

    var indexOfNode = nodes.findIndex(i => i.id === verticeSelecionado.id);

    removeNodeAction(nodes.splice(indexOfNode, 1));
    console.log("Antes Remover Links", links.length);

    console.log("Remover Links", links);
}