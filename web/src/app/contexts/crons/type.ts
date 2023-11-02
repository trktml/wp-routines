export enum cronsActionKind {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    EDIT = 'EDIT',
    UPDATE = 'UPDATE',
}

export interface cronsAction {
    type: cronsActionKind;
    payload: any;
}

export interface CronsItemProps {
    id: number;
    value: string;
    isChecked: boolean;
    date: Date;
}
