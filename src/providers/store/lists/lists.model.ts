export interface ITaskList {
    id: number,
    name: string,
    users: Array<number>,
    list_items: Array<IListItem>,
    readonly date_created: string,
    readonly date_modified: string
}

export interface IListItem {
    id: number,
    name: string,
    state: 'DONE' | 'UNDONE',
    readonly date_created: string,
    readonly date_modified: string
}
