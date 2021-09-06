export const removerVertice = (nodes, links, verticeSelecionado, removeNodeAction, removeEdgeAction) => {
    const tamanho = links.length;
    for (let i = tamanho - 1; i >= 0; i--) {
        if (links[i].source.id === verticeSelecionado.id || links[i].target.id === verticeSelecionado.id) {
            removeEdgeAction(links.splice(i, 1)[0]);
        }
    }

    var indexOfNode = nodes.findIndex(i => i.id === verticeSelecionado.id);

    removeNodeAction(nodes.splice(indexOfNode, 1)[0]);
}