import { ICaminhoVertice } from "../../store/types/canvasTypes";

export class CaminhoVertice implements ICaminhoVertice{
    vertice : number;
    caminho = new Array<number>()
    
    constructor(vertice: number, caminho?: Array<number>) {
        this.vertice = vertice;
        this.caminho = caminho?? [];
    }
} 