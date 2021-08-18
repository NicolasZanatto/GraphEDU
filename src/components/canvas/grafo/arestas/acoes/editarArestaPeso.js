export const EditEdgeValue = (links, edge, editEdgeAction) => {


    //Find index of specific object using findIndex method.    
    let objIndex = links.findIndex((obj => obj.id === edge.id));

    //Log object to Console.
    console.log("Before update: ", links[objIndex])

    //Update object's name property.

    links[objIndex].value = 5

    //Log object to console again.
    console.log("After update: ", links[objIndex])

    editEdgeAction(links[objIndex]);
}