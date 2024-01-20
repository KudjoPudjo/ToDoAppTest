export enum Statuses {
    default,
    new,
    inProgress,
    finished
}

export interface TaskState {
    text:string,
    status:Statuses,
    date:string,
    id:number
}

