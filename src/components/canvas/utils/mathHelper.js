const xAngle = (v) => {
    return Math.atan(v.y / v.x) + (v.x < 0 ? Math.PI : 0);
}

const isFiniteNumber = (x) => {
    return typeof x === 'number' && (Math.abs(x) < Infinity);
}

const isVector = (v) => {
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

export function tickPesoAresta(d) {
    // Checks just in case, especially useful at the start of the sim
    if (!(isVector(d.source) && isVector(d.target))) {
        return '';
    }

    // Get the geometric center of the text element
    var box = this.getBBox();
    var center = {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2
    };

    // Get the tangent vector
    var delta = {
        x: d.target.x - d.source.x,
        y: d.target.y - d.source.y
    };

    // Rotate about the center
    return 'rotate('
        + (-180 / Math.PI * xAngle(delta))
        + ' ' + center.x
        + ' ' + center.y
        + ')';
};

export const tickEdge = (d, dirigido) => {
    if (dirigido) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }
    else {
        return `M${d.source.x} ${d.source.y} ${d.target.x} ${d.target.y}`;

    }
};

export const linksNextId = (links) => {

    if (links.length === 0) return 1;
    if (links.length === 1) return 2;

    var id = links.map(o => { return o.id }).reduce(function (a, b) {

        return Math.max(a, b);
    }) + 1;
    return id;
}