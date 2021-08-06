export const xAngle = (v) => {
    return Math.atan(v.y / v.x) + (v.x < 0 ? Math.PI : 0);
}

export const isFiniteNumber = (x) => {
    return typeof x === 'number' && (Math.abs(x) < Infinity);
}

export const isVector = (v) => {
    return isFiniteNumber(v.x) && isFiniteNumber(v.y);
}