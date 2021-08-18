let idEdge = 1;

export const addEdgeValue = (links, source, target, addEdgeAction) => {
    var value = prompt("Digite um valor entre 0 a 100 para a aresta");
    var newLink = { id: idEdge, source: source, target: target, value: value };
    links.push(newLink);

    addEdgeAction(newLink);
    idEdge++;
}