export enum eModoCriacao {
    CriacaoVertice = 1,
    CriacaoAresta = 2,
    MoverVertice = 3
  }

export const eModoCriacaoDescription = new Map<number, string>([
  [eModoCriacao.CriacaoVertice, 'Criação Vértice'],
  [eModoCriacao.CriacaoAresta, 'Criação Aresta'],
  [eModoCriacao.MoverVertice, 'Mover Vértice'],
  
]);