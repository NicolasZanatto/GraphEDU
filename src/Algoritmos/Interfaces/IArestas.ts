import IVertices from "./IVertices";

interface IArestas {
    id: Number,
    source: IVertices,
    target: IVertices,
    value: Number
}

export default IArestas;