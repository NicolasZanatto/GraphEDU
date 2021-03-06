import * as d3 from "d3";

export const EditEdgeValue = (links, edge, editEdgeAction, valorado) => {

    //Find index of specific object using findIndex method.    
    const indice = links.findIndex((obj => obj.id === edge.id));
    let value = prompt("Digite um valor menor ou igual a 100 para a aresta");
    while(isNaN(value) || parseInt(value) > 100 || value === ''){
        value = prompt("Digite um valor entre 0 a 100 para a aresta");
    }
    value = parseInt(value);    const arestaEditada = { ...links[indice], value: value };

    links.splice(indice, 1);
    links.push(arestaEditada);
    editEdgeAction(arestaEditada);
}

export const UpdateEdgeValueOnSVG = (links) => {
    d3.selectAll(".textpath").data(links, function (d) {
        return d.id;
    }).text(d => d.value);
}