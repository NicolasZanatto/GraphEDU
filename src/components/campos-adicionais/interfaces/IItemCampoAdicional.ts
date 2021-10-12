export interface ICamposAdicionais {
    itens: Array<IItem>
}

export interface IItem {
    id: string,
    titulo: string,
    valor: string | undefined
}