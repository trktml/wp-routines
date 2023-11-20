import { CronsItemProps, cronsAction, cronsActionKind } from './type';

export const cronsReducer = (crons: CronsItemProps[], action: cronsAction) => {
    switch (action.type) {
        case cronsActionKind.ADD: {
            return [
                ...crons,
                {
                    id: action.payload.id,
                    value: action.payload.value,
                    frequency: action.payload.frequency,
                    date: action.payload.date,
                    lastSent: action.payload.lastSent,
                } as CronsItemProps,
            ];
        }

        case cronsActionKind.REMOVE: {
            return crons.filter(
                (_: CronsItemProps, index: number) =>
                    _.id !== action.payload.id
            );
        }

        case cronsActionKind.EDIT: {
            return crons.map((item: CronsItemProps, index: number) =>
                item.id === action.payload.id
                    ? ({
                        value: action.payload.value,
                        frequency: action.payload.frequency,
                        date: action.payload.date,
                        lastSent: action.payload.lastSent,
                    } as CronsItemProps)
                    : item
            );
        }

        case cronsActionKind.UPDATE: {
            return (crons = action.payload);
        }
    }
};
