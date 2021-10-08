let idEdge = 1;

export const addEdgeValue = (links, source, target, addEdgeAction, valorado) => {
    let value;
    if (valorado) {
        value = prompt("Digite um valor menor ou igual a 100 para a aresta");
        while(isNaN(value) || parseInt(value) > 100 || value === ''){
            value = prompt("Digite um valor entre 0 a 100 para a aresta");
        }
        value = parseInt(value);
    }
    var newLink = { id: idEdge, source: source, target: target, value: value };
    links.push(newLink);

    addEdgeAction(newLink);
    idEdge++;
}