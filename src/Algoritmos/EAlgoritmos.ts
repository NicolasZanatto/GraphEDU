export enum EAlgoritmos {
    DFS = 1,
    BFS = 2,
    DIJKSTRA = 3,
    FLOYDWARSHALL = 4,
    BELLMANFORD = 5,
    PRIM = 6,
    KRUSKAL = 7
  }

export const EAlgoritmosDescription = new Map<number, string>([
  [EAlgoritmos.DFS, 'DFS'],
  [EAlgoritmos.BFS, 'BFS'],
  [EAlgoritmos.DIJKSTRA, 'DIJKSTRA'],
  [EAlgoritmos.FLOYDWARSHALL, 'FLOYD WARSHALL'],
  [EAlgoritmos.BELLMANFORD, 'BELLMAN FORD'],
  [EAlgoritmos.PRIM, 'PRIM'],
  [EAlgoritmos.KRUSKAL, 'KRUSKAL']
]);