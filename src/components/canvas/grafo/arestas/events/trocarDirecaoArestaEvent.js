export const changeEdgeDirection = (links, edge, changeEdgeDirectionAction) => {

    //Find index of specific object using findIndex method.    
    const indice = links.findIndex((obj => obj.id === edge.id));

    //Verifica se já existe uma aresta com a mesma origem e destino
    if (links.some((link) => {
        return link.source.id === links[indice].target.id
            && link.target.id === links[indice].source.id
    })) return;

    const arestaEditada = { ...links[indice], source: links[indice].target, target: links[indice].source };

    links.splice(indice, 1);
    links.push(arestaEditada);
    changeEdgeDirectionAction(arestaEditada);
}