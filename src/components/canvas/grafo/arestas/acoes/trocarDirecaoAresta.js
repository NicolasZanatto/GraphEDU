export const changeEdgeDirection = (links, edge, changeEdgeDirectionAction) => {

    //Find index of specific object using findIndex method.    
    const indice = links.findIndex((obj => obj.id === edge.id));

    const arestaEditada = { ...links[indice], source: links[indice].target, target: links[indice].source };

    links.splice(indice, 1);
    links.push(arestaEditada);
    changeEdgeDirectionAction(arestaEditada);
}