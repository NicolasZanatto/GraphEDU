import { ArrayNextId } from "../../utils/mathHelper"; 

export const addEdgeValue = (links, source, target, addEdgeAction, valorado) => {
    let value;
    if (valorado) {
        value = prompt("Digite um valor menor ou igual a 100 para a aresta");
        while(isNaN(value) || parseInt(value) > 100 || value === ''){
            value = prompt("Digite um valor entre 0 a 100 para a aresta");
        }
        value = parseInt(value);
    }
    var idEdge = ArrayNextId(links);

    var newLink = { id: idEdge, source: source, target: target, value: value };
    links.push(newLink);

    if(addEdgeAction !== undefined)
        addEdgeAction(newLink);
}

export const adicionarArestaReset = (links, source, target, value) => {
    var idEdge = ArrayNextId(links)
    var newLink = { id: idEdge, source: source, target: target, value: value };
    links.push(newLink);
}