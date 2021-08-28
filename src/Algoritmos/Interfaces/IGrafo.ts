import Vertices from "./IVertices";
import IArestas from "./IArestas";

interface IGrafo {
    vertices: Array<Vertices>,
    arestas: Array<IArestas>,
    valorado: Boolean,
    dirigido: Boolean
}

export default IGrafo;