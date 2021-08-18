import * as d3 from "d3";

let idNode = 1;

export const adicionarVertice = (nodes, idSVG, addNodeAction) => {
    if (d3.event.button === 0 && d3.event.target.id === idSVG) {
        var coords = d3.mouse(d3.event.currentTarget);

        var newVertice = {

            id: idNode,
            x: coords[0],
            y: coords[1],
            fx: coords[0],
            fy: coords[1]
        };
        nodes.push(newVertice);
        addNodeAction(newVertice);
        idNode++;
    }
}