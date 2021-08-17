export const xAngle = (v) => {
    return Math.atan(v.y / v.x) + (v.x < 0 ? Math.PI : 0);
}

export const isFiniteNumber = (x) => {
    return typeof x === 'number' && (Math.abs(x) < Infinity);
}

export const isVector = (v) => {
    return isFiniteNumber(v.x) && isFiniteNumber(v.y);
}

export const nodesNextId = (nodes) => {

    if (nodes.length === 0) return 1;
    if (nodes.length === 1) return 2;

    var id = nodes.map(o => { return o.id }).reduce(function (a, b) {

        return Math.max(a, b);
    }) + 1;
    return id;
}

export const linksNextId = (links) => {

    if (links.length === 0) return 1;
    if (links.length === 1) return 2;

    var id = links.map(o => { return o.id }).reduce(function (a, b) {

        return Math.max(a, b);
    }) + 1;
    return id;
}