export const RemoveEdgeValue = (links, edge, removeEdgeAction) => {
    //Find index of specific object using findIndex method.    
    const indice = links.findIndex((obj => obj.id === edge.id));
    removeEdgeAction(links.splice(indice, 1)[0]);
}